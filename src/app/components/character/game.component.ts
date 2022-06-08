import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, CharacterPartsFragment} from "../../../generated/graphql";
import {PickingService} from "../../services/picking.service";

@Component({
  selector: 'app-game', templateUrl: './game.component.html', styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {


  rangePerRound = 3
  round = 1
  isValid = false
  characterRoundOptions: CharacterPartsFragment[] = []
  initialGame = true // value if the characters have been updated via parent

  constructor(private pickingService: PickingService) {
  }

  private _characters: CharacterPartsFragment[]

  get characters() {
    return this._characters
  }

  @Input() set characters(characters: CharacterPartsFragment[]) {
    this._characters = characters
    if (this.initialGame) {
      this.initialGame = false
    } else {
      this.changeCharacters()
    }
  }

  @Output()
  gameOverEventEmitter = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.pickingService.takenPicks.subscribe(res => this.isValid = res.length === this.rangePerRound)
    this.changeCharacters()
  }

  triggerNext() {
    this.pickingService.submitPicks()
    this.changeCharacters()
  }

  changeCharacters() {
    this.characterRoundOptions = []
    for (let i = 0; i < this.rangePerRound; i++) {
      const character = this.characters.pop()
      if (character !== undefined) {
        this.characterRoundOptions.push(character)
      } else {
        this.gameOverEventEmitter.emit(true)
      }
    }
  }
}
