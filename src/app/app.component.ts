import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AniListHttpClientService } from './services/ani-list-http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'anime-smash-or-pass';

  constructor(private anilist: AniListHttpClientService) {}
  async ngOnInit() {}

  result: any;
  async makeRequest() {
    this.result = (await this.anilist.getMedia(1)).title.english;
  }
}
