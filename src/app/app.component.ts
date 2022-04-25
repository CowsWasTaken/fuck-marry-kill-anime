import {Component} from '@angular/core';
import {MediaListCollection} from 'src/models/DTO/MediaListCollection';
import {AniListHttpClientService} from './services/ani-list-http-client.service';
import {MockCharacterList} from "./mock-data/MockCharacterList";
import {TakenPick} from "../models/TakenPick";
import {PickOption} from "../models/PickOption";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';
  takenPicks: TakenPick[] = []
  result: MediaListCollection | null = null
  mockCharacterList = MockCharacterList

  constructor(private anilist: AniListHttpClientService) {
  }

  ngOnInit() {
  }

  getUserAnime() {
    this.anilist.getUserAnime('applejackFanAcc').subscribe(res => {
      this.result = res.data.MediaListCollection
      console.log(this.result)
    })
  }
  // works as it should
  setTakenPicks($event: TakenPick) {
    this.removeElementFromArray($event)
    const samePickExists = this.findMatchingPick($event.pick)
    if (samePickExists) {
      this.removeElementFromArray(samePickExists)
    }
    this.takenPicks.push($event)
  }

  private removeElementFromArray(takenPick: TakenPick) {
    const index = this.takenPicks.findIndex(element => element.character === takenPick.character);
    if (index > -1) {
      this.takenPicks.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  private findMatchingPick(pick: PickOption) {
    return this.takenPicks.find(element => element.pick === pick)
  }
}
