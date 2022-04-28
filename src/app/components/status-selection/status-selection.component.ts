import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {FilterComponent} from "../../interfaces/FilterComponent";
import {StatusFilter} from "../../models/Filter/StatusFilter";

@Component({
  selector: 'app-status-selection',
  templateUrl: './status-selection.component.html',
  styleUrls: ['./status-selection.component.css']
})
export class StatusSelectionComponent implements OnInit, FilterComponent {

  @Input() resetEvent?: Observable<void>

  @Output() statusEmitter = new EventEmitter<StatusFilter[]>()

  statusList: StatusFilter[]

  defaultList = [
    { name: 'Watching', completed: true },
    { name: 'Completed', completed: true },
    { name: 'Paused', completed: true },
    { name: 'Planning', completed: true }
  ]
  allComplete = true

  ngOnInit(): void {
    this.setToDefault()
    this.resetEvent!.subscribe(() => {
      this.setToDefault()
    })
  }

  setAllTasks(status: boolean) {
    for (const item of this.statusList) {
      item.completed = status
    }
  }

  checkAllComplete() {
    this.allComplete = this.isAllComplete();
  }

  isAllComplete() {
    for (const item of this.statusList) {
      if (!item.completed) {
        return false
      }
    }
    return true
  }

  // TODO checkboxes get the correct updated values but are not updated in the frontend
  setToDefault() {
    this.statusList = [...this.defaultList]
    this.checkAllComplete()
    this.emitEmpty()
  }

  emitChange() {
    this.statusEmitter.emit(this.statusList)
  }

  emitEmpty() {
    this.statusEmitter.emit(undefined)
  }
}
