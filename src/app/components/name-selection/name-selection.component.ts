import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth-service.service";
import {AniListHttpClientService} from "../../services/ani-list-http-client.service";

@Component({
  selector: 'app-name-selection',
  templateUrl: './name-selection.component.html',
  styleUrls: ['./name-selection.component.sass']
})
export class NameSelectionComponent implements OnInit {

  @Input()
  resetEvent?: Observable<void>
  @Output()
  nameEmitter= new EventEmitter<string>()

   private _userName: string = ''

  get userName(): string {
    return this._userName
  }

  set userName(value: string) {
    this._userName = value
    this.emitChange()
  }
  id: number

  constructor(private authService: AuthService, private anilist: AniListHttpClientService) {
  }

  ngOnInit(): void {
    this.authService.getAuthToken().subscribe(token =>  {
      if (token !== null) {
        this.anilist.getUserWithFavourites().subscribe(({data, error}) => {
          this.userName = data.AniChartUser!.user!.name
          this.id = data.AniChartUser!.user!.id
        })
      }
    })
    this.resetEvent?.subscribe(() => {
      this.userName = ''
      this.emitChange()
    })
  }
  emitChange() {
    this.nameEmitter.emit(this.userName);
  }

}
