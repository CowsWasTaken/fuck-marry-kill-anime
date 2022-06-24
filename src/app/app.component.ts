import {Component} from '@angular/core';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {SettingsFilter} from "./models/Filter/SettingsFilter";
import {
  AniChartUserPartsFragment, CharacterConnectionPartsFragment,
  CharacterPartsFragment,
  CharacterRole,
  MediaListCollectionPartsFragment,
  MediaPartsFragment,
  MediaType
} from "../generated/graphql";
import {DataExtractService} from "./services/data-extract.service";
import {FilterService} from "./services/filter.service";
import {AuthService} from "./services/auth-service.service";
import {BehaviorSubject, firstValueFrom} from "rxjs";

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
  userInfo : AniChartUserPartsFragment | null = null
  isLogin$ = new BehaviorSubject<boolean>(false)

  constructor(private anilist: AniListHttpClientService,
              private dataExtractor: DataExtractService,
              private filterService: FilterService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuthToken().subscribe(data => {
      if (data?.access_token != null) {
        this.isLogin$.next(true)
      } else {
        this.isLogin$.next(false)
      }
    })
  }

  async processUserAndMedia(settingsFilter: SettingsFilter, role?: CharacterRole) {
    this.requestLoading = true
    let {name, type, status} = settingsFilter

    let promiseMedia = firstValueFrom(this.anilist.getMedia(name, type, role, status)).then(res => res.data.MediaListCollection)
    if (this.isLogin$.getValue()) {
      this.userInfo = await firstValueFrom(this.anilist.getUserWithFavourites()).then(res => res.data.AniChartUser)
    }
    const mediaInfo = await promiseMedia
    this.characters = this.filterAndExtractCharacter(mediaInfo, settingsFilter)
    this.requestLoading = false
  }

  filterAndExtractCharacter(mediaListCollection: MediaListCollectionPartsFragment, settingsFilter: SettingsFilter,) {
    const mediaList: MediaPartsFragment[] = this.filterService.filterForSettingsFilter(mediaListCollection, settingsFilter)
    let characters = this.dataExtractor.extractCharactersForMediaList(mediaList)
    characters = this.filterService.filterCharacters(characters, settingsFilter)
    return this.dataExtractor.shuffle(characters)
  }

  async onStartToggleChange(settingsFilter: SettingsFilter) {
    if (settingsFilter.name === undefined) {
      throw Error('Cannot search for Username undefined')
    }
    await this.processUserAndMedia(settingsFilter, CharacterRole.Main)
    this.gameAlive = true
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  toggleFavouriteCharacter(number: number) {
    this.anilist.toggleFavouriteCharacter(number).subscribe(({data}) => console.log(data))
  }

  handleGameOverEvent() {
    this.gameAlive = false
  }

  getFavourites(): CharacterConnectionPartsFragment {
    return this.userInfo?.user?.favourites?.characters!;
  }
}
