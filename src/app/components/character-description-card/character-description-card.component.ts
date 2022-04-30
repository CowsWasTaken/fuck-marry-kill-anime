import {Component, Input, OnInit} from '@angular/core';
import {CharacterPartsFragment} from "../../../generated/graphql";

@Component({
  selector: 'app-character-description-card',
  templateUrl: './character-description-card.component.html',
  styleUrls: ['./character-description-card.component.sass']
})
export class CharacterDescriptionCardComponent implements OnInit {

  constructor() { }

  @Input()
  character: CharacterPartsFragment

  ngOnInit(): void {
  }

}
