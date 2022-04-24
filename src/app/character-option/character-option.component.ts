import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../models/DTO/Character";

@Component({
  selector: 'app-character-option',
  templateUrl: './character-option.component.html',
  styleUrls: ['./character-option.component.css']
})
export class CharacterOptionComponent implements OnInit {

  @Input()
  character: Character = {
    "id": 45887,
    "name": {
      "full": "Sasha Blouse",
      "userPreferred": "Sasha Blouse"
    },
    "image": {
      "large": "https://s4.anilist.co/file/anilistcdn/character/large/b45887-QPtJH0KwqthW.jpg"
    },
    "siteUrl": "https://anilist.co/character/45887",
    "favourites": 7482,
    "gender": "Female"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
