import {Component} from '@angular/core';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {MockCharacterList} from "./mock/MockCharacterList";
import {SettingsFilter} from "./models/Filter/SettingsFilter";
import {
  CharacterPartsFragment,
  CharacterRole,
  MediaListCollectionPartsFragment,
  MediaListStatus,
  MediaType
} from "../generated/graphql";
import {DataExtractService} from "./services/data-extract.service";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  result: MediaListCollectionPartsFragment | null = null
  characters : CharacterPartsFragment[]

  MediaType = MediaType

  constructor(private anilist: AniListHttpClientService, private dataExtractor: DataExtractService) {
  }

  ngOnInit() {
  }

  getUserAndType(name: string, type: MediaType, role?: CharacterRole, status_in? : MediaListStatus[]) {
    this.anilist.getUserAndType(name, type, role, status_in).subscribe(({data}) => {
      this.result = data.MediaListCollection
      console.log(data)
      const characters = this.dataExtractor.extractCharacters(data.MediaListCollection)
      this.characters = this.dataExtractor.shuffle(characters)
    })
  }

  onFilterChange(settingsFilter: SettingsFilter) {
    let {name, type, status} = settingsFilter
    console.log(settingsFilter);

    if (name === undefined) {
      throw Error('Cannot search for Username undefined')
    }
    this.getUserAndType(name, type, CharacterRole.Main, status)
  }
}
