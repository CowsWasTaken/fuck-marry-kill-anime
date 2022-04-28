import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YearFilter} from "../../models/Filter/YearFilter";
import {Observable} from "rxjs";
import { YearFilterType } from 'src/app/models/Filter/YearFilterType';
import {FilterComponent} from "../../interfaces/FilterComponent";

@Component({
  selector: 'app-year-selection',
  templateUrl: './year-selection.component.html',
  styleUrls: ['./year-selection.component.css']
})
export class YearSelectionComponent implements OnInit, FilterComponent {
  @Input()
  resetEvent?: Observable<void>
  @Output() yearEmitter = new EventEmitter<YearFilter>();
  currentYear = new Date().getFullYear()
  startYear = 1950
  defaultYear = 1990
  inputYear: number
  tooltipDelay = 100 // in ms

  YearFilterType = YearFilterType

  defaultFilterType: YearFilterType = YearFilterType.disabled
  filterType: YearFilterType

  constructor() {
  }

  ngOnInit(): void {
    this.setToDefault()
    this.resetEvent!.subscribe(() => {
      this.setToDefault()
    })
  }

  emitChange() {
    this.yearEmitter.emit({year: this.inputYear, filterType: this.filterType});
  }

  setToDefault() {
    this.inputYear = this.defaultYear
    this.filterType = this.defaultFilterType
    this.emitEmpty();
  }

  emitEmpty() {
    this.yearEmitter.emit(undefined)
  }
}
