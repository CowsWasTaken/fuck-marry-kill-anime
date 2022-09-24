import {Injectable} from '@angular/core';
import {CharacterPartsFragment, MediaListCollectionPartsFragment, MediaPartsFragment} from "../graphql/graphql";

@Injectable({
  providedIn: 'root'
})
export class DataExtractService {

  extractCharacters(mediaListCollection: MediaListCollectionPartsFragment): CharacterPartsFragment[] {
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
        characters = this.mergeCharacterLists(characters, charactersFromMedia)
      }
    }
    return characters
  }

  extractCharactersForMedia(media: MediaPartsFragment): CharacterPartsFragment[] {
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
      const charactersFromMedia = this.extractCharactersForMedia(media)
      this.mergeCharacterLists(characters, charactersFromMedia)
    })
    return characters
  }

  /**
   * anime/mange contain the same characters in different seasons. To not have duplicate entries the id's of the
   * characters get compared and added if missing
   * @param listOne
   * @param listTwo
   */
  mergeCharacterLists(listOne: CharacterPartsFragment[], listTwo: CharacterPartsFragment[]): CharacterPartsFragment[] {
    for (const characterPartsFragment of listTwo) {
      if (!listOne.find(existingCharacter => existingCharacter.id === characterPartsFragment.id)) {
        listOne.push(characterPartsFragment)
      }
    }
    return listOne
  }

  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
