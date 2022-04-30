import {Injectable} from '@angular/core';
import {CharacterPartsFragment, MediaListCollectionPartsFragment} from "../../generated/graphql";

@Injectable({
  providedIn: 'root'
})
export class DataExtractService {

  constructor() {
  }


  extractCharacters(mediaListCollection: MediaListCollectionPartsFragment) {
    let characters: CharacterPartsFragment[] = []
    if (mediaListCollection.lists === undefined) {
      return []
    }
    for (let list of mediaListCollection.lists!) {
      if (list!.entries === undefined) {
        continue
      }
      for (let entry of list!.entries!) {
        if (entry!.media! === undefined) {
          continue
        }
        if (entry!.media!.characters  === undefined) {
          continue
        }
        if (entry!.media!.characters!.nodes === undefined) {
          continue
        }
        for (let character of entry!.media!.characters!.nodes!) {
          characters.push(character as any as CharacterPartsFragment)
        }
      }
    }
    return characters
  }

  shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
