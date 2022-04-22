import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YearFilter} from "../../models/Filter/YearFilter";
import {Observable} from "rxjs";

@Component({
  selector: 'app-year-selection',
  templateUrl: './year-selection.component.html',
  styleUrls: ['./year-selection.component.css']
})
export class YearSelectionComponent implements OnInit {
  @Input()
  resetEvent?: Observable<void>
  @Output() yearEmitter = new EventEmitter<YearFilter>();
  currentYear = new Date().getFullYear()
  startYear = 1950
  defaultYear = 1990
  inputYear: number
  tooltipDelay = 100 // in ms

  defaultFilterType: 'before' | 'after' | 'equal' | 'disabled' = 'disabled'
  filterType: 'before' | 'after' | 'equal' | 'disabled'

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

  private setToDefault() {
    this.inputYear = this.defaultYear
    this.filterType = this.defaultFilterType
    this.emitChange();
  }
}
