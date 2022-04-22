import { Component, OnInit } from '@angular/core';
import {SettingsFilter} from "../../models/Filter/SettingsFilter";
import {YearFilter} from "../../models/Filter/YearFilter";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {

  selectedIndex = [{type  : 'ANIME'},  {type: 'MANGA'}]

  public currentIndex = 0;

  userNameInput = '';

  settingsFilter : SettingsFilter = {}

  $reset = new Subject<void>()

  onYearFilterChange($event: YearFilter) {
    console.log($event)
    this.settingsFilter.yearPreference = $event
  }

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
}

