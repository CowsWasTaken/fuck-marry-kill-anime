import {Component} from '@angular/core';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {SettingsFilter} from "./models/Filter/SettingsFilter";
import {
  CharacterPartsFragment, CharacterRole, MediaListCollectionPartsFragment, MediaPartsFragment, MediaType
} from "../generated/graphql";
import {DataExtractService} from "./services/data-extract.service";
import {FilterService} from "./services/filter.service";
import {HotToastService} from "@ngneat/hot-toast";
import {ApolloError} from "@apollo/client/core";
import {AuthService} from "./services/auth-service.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  result: MediaListCollectionPartsFragment | null = null
  characters: CharacterPartsFragment[]
  requestLoading: boolean = false
  MediaType = MediaType
  gameAlive: boolean = false  // can be replaced by enum with values, IN_GAME, GAME_END, etc. to interact with components
  $isLogin = new BehaviorSubject<boolean>(false)

  constructor(private anilist: AniListHttpClientService,
              private dataExtractor: DataExtractService,
              private filterService: FilterService,
              private toastService: HotToastService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuthToken().subscribe(data => {
      if (data?.access_token != null) {
        this.$isLogin.next(true)
      } else {
        this.$isLogin.next(false)
      }
    })
  }

  getUserAndType(settingsFilter: SettingsFilter, role?: CharacterRole) {
    this.requestLoading = true
    let {name, type, status} = settingsFilter

    this.anilist.getMedia(name, type, role, status)
      .subscribe({
        next: res => {
          this.filterAndExtractData(res.data.MediaListCollection, settingsFilter)
          this.requestLoading = false

        }, error: (err: ApolloError) => {
          this.requestLoading = false
          this.toastService.error("Failure with request", {
            position: 'top-right'
          })
        }
      })


  }

  filterAndExtractData(mediaListCollection: MediaListCollectionPartsFragment, settingsFilter: SettingsFilter,) {
    const mediaList: MediaPartsFragment[] = this.filterService.filterForSettingsFilter(mediaListCollection, settingsFilter)
    let characters = this.dataExtractor.extractCharactersForMediaList(mediaList)
    characters = this.filterService.filterCharacters(characters, settingsFilter)
    this.characters = this.dataExtractor.shuffle(characters)
    this.gameAlive = true
  }

  onStartToggleChange(settingsFilter: SettingsFilter) {
    if (settingsFilter.name === undefined) {
      throw Error('Cannot search for Username undefined')
    }
    this.getUserAndType(settingsFilter, CharacterRole.Main)
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  likeCharacter(number: number) {
    this.anilist.toggleFavouriteCharacter(number).subscribe(({data}) => console.log(data))
  }

  handleGameOverEvent() {
    this.gameAlive = false
  }
}
