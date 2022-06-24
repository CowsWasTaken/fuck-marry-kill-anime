import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GenderType} from "./models/GenderType";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {GenderInfoDialogComponent} from "./gender-info-dialog/gender-info-dialog.component";

@Component({
  selector: 'app-gender-selection',
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.sass']
})
export class GenderSelectionComponent implements OnInit {

  @Input() resetEvent?: Observable<void>
  @Output() genderEmitter = new EventEmitter<GenderType>();
  tooltipDelay = 100 // in ms

  GenderType = GenderType

  selectedType: GenderType

  constructor(public dialog: MatDialog) {
    this.setDefaultValue()
  }

  openDialog() {
    this.dialog.open(GenderInfoDialogComponent);
  }

  ngOnInit(): void {
    this.resetEvent?.subscribe(() => this.setDefaultValue())
  }

  setDefaultValue() {
    this.selectedType = GenderType.ALL

  }

  emitChange() {
    this.genderEmitter.emit(this.selectedType)
  }

}
