import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private favourites = new BehaviorSubject<string []>([])
  // stores list of ids of characters marked from logged-in user

  constructor() { }

  updateFavourites(favourites: string[]) {
    this.favourites.next(favourites)
  }

  getFavourites () {
    return this.favourites;
  }


}
