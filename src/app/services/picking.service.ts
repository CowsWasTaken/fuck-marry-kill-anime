import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TakenPick} from "../../models/TakenPick";
import {PickOption} from "../../models/PickOption";
import {CharacterPartsFragment} from "../../generated/graphql";

@Injectable({
  providedIn: 'root'
})
export class PickingService {

  takenPicks = new BehaviorSubject<TakenPick[]>([])


  constructor() {
  }

  /**
   *
   * @param index index to remove
   * @param list list from which index should be removed
   */
  private static removeIndexFromList(index: number, list: any[]) {
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  getCurrentPicks() {
    return this.takenPicks.getValue();
  }

  // works as it should
  setPick(newPick: TakenPick) {
    const picks = this.takenPicks.getValue()
    this.cleanUpCurrentList(newPick, picks)
    picks.push(newPick)
    this.takenPicks.next(picks)
  }

  /**
   *
   * @param takenPick
   * @param currentList
   * cleans up the current list that a new value can be added with no conflicts
   * such as double PickOption or the same Character twice in the list
   */
  private cleanUpCurrentList(takenPick: TakenPick, currentList: TakenPick[]) {
    this.removePickForCharacter(takenPick.character, currentList)
    this.removeMatchingPick(takenPick.pick, currentList)
  }

  /**
   *
   * @param character character to remove
   * @param list list from which character gets deleted
   */
  private removePickForCharacter(character: CharacterPartsFragment, list: TakenPick[]) {
    const matchingCharacterIndex = list.findIndex(element => element.character === character);
    PickingService.removeIndexFromList(matchingCharacterIndex, list)
  }

  /**
   *
   * @param pick pick type to delete from list
   * @param list list from which pick should be removed
   * @private
   */
  private removeMatchingPick(pick: PickOption, list: TakenPick[]) {
    const matchingPickTypeIndex = list.findIndex(element => element.pick === pick) // index for the same PickOption Type
    PickingService.removeIndexFromList(matchingPickTypeIndex, list)
  }
}
