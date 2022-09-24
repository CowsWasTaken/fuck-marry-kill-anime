import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {CharacterPartsFragment} from "../../graphql/graphql";

@Component({
  selector: 'app-character-description-card',
  templateUrl: './character-description-card.component.html',
  styleUrls: ['./character-description-card.component.sass']
})
export class CharacterDescriptionCardComponent {

  @Input() character: CharacterPartsFragment

  @Input() isLogin$: Observable<boolean>

  @Input() isLiked?: boolean

  @Output() toggleFavourite = new EventEmitter<number>()

  click() {
    // could be set after request was successful
    this.isLiked = !this.isLiked
    this.toggleFavourite.emit(this.character.id)
  }
}
