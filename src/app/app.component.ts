import {Component} from '@angular/core';
import {MediaListCollection} from 'src/models/DTO/MediaListCollection';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {MockCharacterList} from "./mock-data/MockCharacterList";
import {SettingsFilter} from "../models/Filter/SettingsFilter";
import {CharacterRole, MediaType} from "../generated/graphql";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  result: MediaListCollection | null = null
  mockCharacterList = MockCharacterList

  MediaType = MediaType

  constructor(private anilist: AniListHttpClientService) {
  }

  ngOnInit() {
  }

  getUserAndType(name: string, type: MediaType, role?: CharacterRole) {
    this.anilist.getUserAndType(name, type, role).subscribe(res => {
      this.result = res.data.MediaListCollection
      console.log(this.result)
    })
  }

  onFilterChange($event: SettingsFilter) {
    let {name} = $event
    if (name === undefined) {
      throw Error('Cannot search for Username undefined')
    }
    this.getUserAndType(name, MediaType.Manga, CharacterRole.Main)
  }
}
