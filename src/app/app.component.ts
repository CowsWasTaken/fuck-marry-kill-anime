import {Component} from '@angular/core';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {MockCharacterList} from "./mock/MockCharacterList";
import {SettingsFilter} from "./models/Filter/SettingsFilter";
import {CharacterRole, MediaListCollectionPartsFragment, MediaListStatus, MediaType} from "../generated/graphql";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  result: MediaListCollectionPartsFragment | null = null
  mockCharacterList = MockCharacterList

  MediaType = MediaType

  constructor(private anilist: AniListHttpClientService) {
  }

  ngOnInit() {
  }

  getUserAndType(name: string, type: MediaType, role?: CharacterRole, status_in? : MediaListStatus[]) {
    this.anilist.getUserAndType(name, type, role, status_in).subscribe(res => {
      this.result = res.data.MediaListCollection
      console.log(this.result)
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
