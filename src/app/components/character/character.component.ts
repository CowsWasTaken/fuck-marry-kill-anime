import {Component, Input, OnInit} from '@angular/core';
import {CharacterPartsFragment} from "../../../generated/graphql";
import {PickingService} from "../../services/picking.service";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {

  @Input()
  characters: CharacterPartsFragment[]

  rangePerRound = 3

  round = 1
  isValid = false

  characterOptions : CharacterPartsFragment[] = []

  constructor(private pickingService: PickingService) { }

  ngOnInit(): void {
    this.pickingService.takenPicks.subscribe(res => this.isValid = res.length === this.rangePerRound)
    this.changeCharacters()
  }

  triggerNext() {
    this.pickingService.submitPicks()
    this.changeCharacters()
  }

  changeCharacters() {
    this.characterOptions = []
    for (let i = (this.rangePerRound * (this.round-1)); i < this.rangePerRound * this.round; i++) {
      this.characterOptions.push(this.characters[i])
    }
  }
}
