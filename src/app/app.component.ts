import {Component} from '@angular/core';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {SettingsFilter} from "./models/Filter/SettingsFilter";
import {
  CharacterPartsFragment,
  CharacterRole,
  MediaListCollectionPartsFragment,
  MediaListStatus, MediaPartsFragment,
  MediaType
} from "../generated/graphql";
import {DataExtractService} from "./services/data-extract.service";
import {FilterService} from "./services/filter.service";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  result: MediaListCollectionPartsFragment | null = null
  characters : CharacterPartsFragment[]

  MediaType = MediaType

  constructor(private anilist: AniListHttpClientService, private dataExtractor: DataExtractService, private filterService: FilterService) {
  }

  ngOnInit() {
  }

  getUserAndType(settingsFilter: SettingsFilter, role?: CharacterRole) {
    let {name, type, status} = settingsFilter

    this.anilist.getUserAndType(name, type, role, status).subscribe(({data, error}) => {
      this.filterAndExtractData(data.MediaListCollection, settingsFilter)
    })
  }

  filterAndExtractData (mediaListCollection : MediaListCollectionPartsFragment, settingsFilter: SettingsFilter,) {
    const mediaList: MediaPartsFragment[] = this.filterService.filterForSettingsFilter(mediaListCollection, settingsFilter)
    const characters = this.dataExtractor.extractCharactersForMediaList(mediaList)
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
