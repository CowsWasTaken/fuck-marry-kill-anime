import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterComponentInterface} from "../../interfaces/filter-component.interface";
import {StatusFilter} from "../../models/Filter/StatusFilter";
import {MediaListStatus} from "../../graphql/graphql";

@Component({
  selector: 'app-status-selection',
  templateUrl: './status-selection.component.html',
  styleUrls: ['./status-selection.component.css']
})
export class StatusSelectionComponent implements OnInit, FilterComponentInterface {
  // TODO reset event currently not supported because value change of checkbox not getting visually updated
  // @Input() resetEvent?: Observable<void>

  @Output() statusEmitter = new EventEmitter<MediaListStatus[]>()

  statusList: StatusFilter[]

  defaultList = [{status: MediaListStatus.Completed, checked: true}, {
    status: MediaListStatus.Current,
    checked: false
  }, {status: MediaListStatus.Paused, checked: false}, {
    status: MediaListStatus.Planning,
    checked: false
  }, {status: MediaListStatus.Repeating, checked: true}, {status: MediaListStatus.Dropped, checked: false},]
  allComplete = true

  private static convertList(list: StatusFilter[]): any[] {
    const convList: MediaListStatus[] = []
    for (const status of list) {
      if (status.checked) {
        convList.push(status.status)
      }
    }
    return convList;
  }

  ngOnInit(): void {
    this.setToDefault()
    // this.resetEvent?.subscribe(() => {
    //   this.setToDefault()
    // })
  }

  setAllTasks(status: boolean) {
    for (const item of this.statusList) {
      item.checked = status
    }
  }

  checkAllComplete() {
    this.allComplete = this.isAllComplete();
  }

  isAllComplete() {
    for (const item of this.statusList) {
      if (!item.checked) {
        return false
      }
    }
    return true
  }

  // TODO checkboxes get the correct updated values but are not updated in the frontend
  setToDefault() {
    this.statusList = [...this.defaultList]
    this.checkAllComplete()
    this.emitChange()
  }

  emitChange() {
    const list = StatusSelectionComponent.convertList(this.statusList)
    this.statusEmitter.emit(list)
  }
}
