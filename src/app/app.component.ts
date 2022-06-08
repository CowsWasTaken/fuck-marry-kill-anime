import {Component} from '@angular/core';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {SettingsFilter} from "./models/Filter/SettingsFilter";
import {
  CharacterPartsFragment,
  CharacterRole,
  MediaListCollectionPartsFragment,
  MediaPartsFragment,
  MediaType
} from "../generated/graphql";
import {DataExtractService} from "./services/data-extract.service";
import {FilterService} from "./services/filter.service";
import {GenderType} from "./components/gender-selection/models/GenderType";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  result: MediaListCollectionPartsFragment | null = null
  characters : CharacterPartsFragment[]
  requestLoading: boolean = false
  MediaType = MediaType

  constructor(private anilist: AniListHttpClientService, private dataExtractor: DataExtractService, private filterService: FilterService) {
  }

  ngOnInit() {
  }

  getUserAndType(settingsFilter: SettingsFilter, role?: CharacterRole) {
    this.requestLoading = true
    let {name, type, status} = settingsFilter
    this.anilist.getUserAndType(name, type, role, status).subscribe(({data, error, loading}) => {
      this.filterAndExtractData(data.MediaListCollection, settingsFilter)
      this.requestLoading = loading
    })
  }

  filterAndExtractData (mediaListCollection : MediaListCollectionPartsFragment, settingsFilter: SettingsFilter,) {
    const mediaList: MediaPartsFragment[] = this.filterService.filterForSettingsFilter(mediaListCollection, settingsFilter)
    let characters = this.dataExtractor.extractCharactersForMediaList(mediaList)
    characters = this.filterService.filterCharacters(characters, settingsFilter)
    this.characters = this.dataExtractor.shuffle(characters)
  }

  onStartToggleChange(settingsFilter: SettingsFilter) {
    console.log(settingsFilter);
    if (settingsFilter.name === undefined) {
      throw Error('Cannot search for Username undefined')
    }
    this.getUserAndType(settingsFilter, CharacterRole.Main)
  }

  likeCharacter(number: number) {
    this.anilist.toggleFavourite(number).subscribe(({data}) => console.log(data))
  }
}
