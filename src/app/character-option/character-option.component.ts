import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from "../../models/DTO/Character";
import {PickOption} from "../../models/PickOption";
import {TakenPick} from "../../models/TakenPick";

@Component({
  selector: 'app-character-option',
  templateUrl: './character-option.component.html',
  styleUrls: ['./character-option.component.css']
})
export class CharacterOptionComponent implements OnInit {

  @Input() character: Character
  @Output('pick') pickEmitter = new EventEmitter<TakenPick>()
  PickOption = PickOption
  pick: PickOption | undefined

  constructor() {
  }

  private _takenPicks: TakenPick[]

  get takenPicks() {
    return this._takenPicks
  }

  @Input() set takenPicks(takenPicks: TakenPick[]) {
    this._takenPicks = takenPicks
    this.resetIfPickIsTaken()
  }

  ngOnInit(): void {
  }

  emitChange() {
    if (this.pick !== undefined) {
      this.pickEmitter.emit({pick: this.pick, character: this.character})
    }
  }

  resetIfPickIsTaken() {
    // TODO not getting called idk why
    console.log('here')
    if (this.pick === undefined) {
      return
    }
    for (const takenPicksKey of this.takenPicks) {
      if (this.pick === takenPicksKey.pick && this.character !== takenPicksKey.character) {
        this.pick = PickOption.UNCHECKED
      }
    }
  }
}
