import {Component} from '@angular/core';

@Component({
  selector: 'app-status-selection',
  templateUrl: './status-selection.component.html',
  styleUrls: ['./status-selection.component.css']
})
export class StatusSelectionComponent {
  statusList = [
    {name: 'Watching', completed: true},
    {name: 'Completed', completed: true,},
    {name: 'Paused', completed: true},
    {name: 'Planning', completed: true}
  ]

  allComplete = true

  setAllTasks(status: boolean) {
    console.log(status)
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
}
