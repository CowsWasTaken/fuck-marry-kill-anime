import { Component } from '@angular/core';
import { MediaListCollection } from 'src/models/DTO/MediaListCollection';
import { AniListHttpClientService } from './services/ani-list-http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'fuck-marry-kill-anime';

  constructor(private anilist: AniListHttpClientService) {}
  async ngOnInit() {}

  result : MediaListCollection | null = null

   getUserAnime() {
     this.anilist.getUserAnime('applejackFanAcc').subscribe(res => {
      this.result = res.data.MediaListCollection
       console.log(this.result)
    })
  }
}
