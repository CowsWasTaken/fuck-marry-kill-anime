import {Component, Input, OnInit} from '@angular/core';
import {PickOption} from "../../models/Picking/PickOption";
import {PickTaken} from "../../models/Picking/PickTaken";
import {PickingService} from "../../services/picking.service";
import {CharacterPartsFragment} from "../../../generated/graphql";
import {Observable} from "rxjs";

@Component({
  selector: 'app-character-option',
  templateUrl: './character-option.component.html',
  styleUrls: ['./character-option.component.css']
})
export class CharacterOptionComponent implements OnInit {

  @Input()
  $isLogin: Observable<boolean>

  @Input()
  $isLiked: Observable<boolean | undefined>

  @Input() character: CharacterPartsFragment
  PickOption = PickOption
  pick: PickOption = PickOption.UNCHECKED

  constructor(private pickingService: PickingService) {
    pickingService.takenPicks.subscribe(takenPicks => {
      this.resetIfPickIsTaken(takenPicks)
    })
  }

  ngOnInit(): void {
  }

  emitChange() {
    if (this.pick !== PickOption.UNCHECKED) {
      this.pickingService.setPick({pick: this.pick, character: this.character})
    }
  }

  resetIfPickIsTaken(takenPicks: PickTaken[]) {
    if (this.pick === PickOption.UNCHECKED) {
      return
    }
    for (const takenPicksKey of takenPicks) {
      if (this.pick === takenPicksKey.pick && this.character !== takenPicksKey.character) {
        this.pick = PickOption.UNCHECKED
      }
    }
  }
}
