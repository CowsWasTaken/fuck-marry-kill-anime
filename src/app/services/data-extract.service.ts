import {Injectable} from '@angular/core';
import {CharacterPartsFragment, MediaListCollectionPartsFragment, MediaPartsFragment} from "../../generated/graphql";

@Injectable({
  providedIn: 'root'
})
export class DataExtractService {

  constructor() {
  }

  // TODO check if the character exist in list because a character can exist in more than one anime
  // so better check for the id and use a map or some kind like that

  // TODO filter for gender


  extractCharacters(mediaListCollection: MediaListCollectionPartsFragment) : CharacterPartsFragment[] {
    let characters: CharacterPartsFragment[] = []
    if (mediaListCollection.lists === undefined) {
      return []
    }
    for (let list of mediaListCollection.lists!) {
      if (list!.entries === undefined) {
        continue
      }
      for (let entry of list!.entries!) {
        const charactersFromMedia = this.extractCharactersForMedia(entry!.media!)
        characters.push(...charactersFromMedia)
      }
    }
    return characters
  }

  extractCharactersForMedia (media: MediaPartsFragment):CharacterPartsFragment[]  {
    let characters: CharacterPartsFragment[] = []
    if (media === undefined || media.characters === undefined || media.characters!.nodes === undefined) {
      return []
    }
    for (let character of media.characters!.nodes!) {
      characters.push(character as any as CharacterPartsFragment)
    }
    return characters
  }

  extractCharactersForMediaList(mediaList: MediaPartsFragment[]) {
    let characters: CharacterPartsFragment[] = []
    mediaList.forEach(media => {
      characters.push(...this.extractCharactersForMedia(media))
    })
    return characters
  }

  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

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
