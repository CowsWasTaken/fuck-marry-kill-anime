import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SettingsFilter} from "../../models/Filter/SettingsFilter";
import {YearFilter} from "../../models/Filter/YearFilter";
import {Subject} from "rxjs";
import {StatusFilter} from "../../models/Filter/StatusFilter";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {

  @Output()
  filterEmitter = new EventEmitter<SettingsFilter>()

  selectedIndex = [{type  : 'ANIME'},  {type: 'MANGA'}]

  public currentIndex = 0;

  userNameInput = '';

  settingsFilter : SettingsFilter = {}

  $reset = new Subject<void>()

  constructor() { }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  isValid():boolean {
    return this.userNameInput.length > 0
  }

  reset() {
    this.$reset.next()
    this.userNameInput = ''
  }

  onGenreFilterChange($event: string[] | undefined) {
    this.settingsFilter.genres = $event
  }

  onStatusFilterChange($event: StatusFilter[] | undefined) {
    this.settingsFilter.status = $event
  }

  onYearFilterChange($event: YearFilter | undefined) {
    this.settingsFilter.yearPreference = $event
  }

  onNameFilterChange($event: string) {
    this.settingsFilter.name = $event
  }

  start() {
    this.filterEmitter.emit(this.settingsFilter)
  }
}

