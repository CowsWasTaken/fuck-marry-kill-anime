import {Component, Input, OnInit} from '@angular/core';
import {CharacterPartsFragment} from "../../../generated/graphql";
import {Observable} from "rxjs";

@Component({
  selector: 'app-character-description-card',
  templateUrl: './character-description-card.component.html',
  styleUrls: ['./character-description-card.component.sass']
})
export class CharacterDescriptionCardComponent implements OnInit {

  constructor() { }

  @Input()
  character: CharacterPartsFragment

  @Input()
  $isLogin: Observable<boolean>

  @Input()
  $isLiked: Observable<boolean | undefined>
  ngOnInit(): void {
  }

  click() {
    // TODO implement functionality with like click
    console.log('click')
  }
}
