import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private favourites = new BehaviorSubject<string []>([])

  updateFavourites(favourites: string[]) {
    this.favourites.next(favourites)
  }

  getFavourites() {
    return this.favourites;
  }


}
