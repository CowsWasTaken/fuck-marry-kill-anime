import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YearFilter} from "../../models/Filter/YearFilter";
import {Observable} from "rxjs";
import {YearFilterType} from 'src/app/models/Filter/YearFilterType';
import {FilterComponentInterface} from "../../interfaces/filter-component.interface";

@Component({
  selector: 'app-year-selection',
  templateUrl: './year-selection.component.html',
  styleUrls: ['./year-selection.component.css']
})
export class YearSelectionComponent implements OnInit, FilterComponentInterface {
  @Input() resetEvent?: Observable<void>
  @Output() yearEmitter = new EventEmitter<YearFilter>();
  readonly currentYear = new Date().getFullYear()
  readonly startYear = 1950
  readonly defaultYear = 1990
  inputYear: number = this.defaultYear
  readonly tooltipDelay = 100 // in ms

  YearFilterType = YearFilterType

  defaultFilterType: YearFilterType = YearFilterType.DISABLED
  filterType: YearFilterType

  constructor() {
  }

  ngOnInit(): void {
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
