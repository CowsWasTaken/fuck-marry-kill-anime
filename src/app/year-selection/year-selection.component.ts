import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year-selection',
  templateUrl: './year-selection.component.html',
  styleUrls: ['./year-selection.component.css']
})
export class YearSelectionComponent implements OnInit {

  show_delay = 100

  year_input : number = 1990

  time_input : 'before' | 'after' | 'equal' | 'disabled' = 'disabled'

  constructor() { }

  ngOnInit(): void {
  }

}
