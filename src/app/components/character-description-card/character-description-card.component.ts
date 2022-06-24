import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CharacterPartsFragment} from "../../../generated/graphql";
import {Observable} from "rxjs";

@Component({
  selector: 'app-character-description-card',
  templateUrl: './character-description-card.component.html',
  styleUrls: ['./character-description-card.component.sass']
})
export class CharacterDescriptionCardComponent{

  @Input()
  character: CharacterPartsFragment

  @Input()
  isLogin$: Observable<boolean>

  @Input()
  isLiked?: boolean

  @Output()
  toggleFavourite = new EventEmitter<number>()

  click() {
    // could be set after request was successful
    this.isLiked = !this.isLiked
    this.toggleFavourite.emit(this.character.id)
  }
}
