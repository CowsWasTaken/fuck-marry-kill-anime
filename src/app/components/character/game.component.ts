import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CharacterConnectionPartsFragment, CharacterPartsFragment} from "../../../generated/graphql";
import {PickingService} from "../../services/picking.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-game', templateUrl: './game.component.html', styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  @Output() toggleFavourite = new EventEmitter<number>()

  @Input() isLogin$: Observable<boolean>

  @Input() favourites?: CharacterConnectionPartsFragment

  rangePerRound = 3
  round = 1
  isValid = false
  characterRoundOptions: CharacterPartsFragment[] = []
  initialGame = true // value if the characters have been updated via parent
  @Output() gameOverEventEmitter = new EventEmitter<boolean>()

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

  toggleFavouriteEvent($event: number) {
    this.toggleFavourite.emit($event)
  }

  isLiked(characterId: number): boolean {
    return !!this.favourites?.nodes!.find(characterNode => characterNode!.id === characterId);
  }
}
