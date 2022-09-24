import {Injectable} from '@angular/core';
import {YearFilter} from "../models/Filter/YearFilter";
import {YearFilterType} from "../models/Filter/YearFilterType";
import {SettingsFilter} from "../models/Filter/SettingsFilter";
import {GenderType} from "../models/GenderType";
import {CharacterPartsFragment, MediaListCollectionPartsFragment, MediaPartsFragment} from "../graphql/graphql";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterForSettingsFilter(mediaListCollection: MediaListCollectionPartsFragment, settingsFilter: SettingsFilter): MediaPartsFragment[] {
    const filteredMedia: MediaPartsFragment[] = []
    const {genres, yearPreference} = settingsFilter
    for (let list of mediaListCollection.lists!) {
      for (let entry of list!.entries!) {
        const media = entry!.media!
        if (genres !== undefined) {
          if (!this.isMediaValidForGenres(media, genres)) {
            continue
          }
        }
        if (yearPreference !== undefined) {
          if (!this.isMediaValidForYear(media, yearPreference)) {
            continue
          }
        }
        filteredMedia.push(media)
      }
    }
    return filteredMedia
  }


  isMediaValidForGenres(media: MediaPartsFragment, genres: string[]) {
    for (const genre of genres) {
      if (media!.genres!.indexOf(genre) > -1) {
        return true
      }
    }
    return false
  }

  isMediaValidForYear(media: MediaPartsFragment, yearFilter: YearFilter) {
    switch (yearFilter.filterType) {
      case YearFilterType.DISABLED:
        return true
      case YearFilterType.EQUAL:
        return media.seasonYear! === yearFilter.year
      case YearFilterType.AFTER:
        return media.seasonYear! >= yearFilter.year
      case YearFilterType.BEFORE:
        return media.seasonYear! <= yearFilter.year
      default:
        throw Error("Cannot Filter Media For FilterType")
    }
  }

  isMediaValidForSettingsFilter(media: MediaPartsFragment, settingsFilter: SettingsFilter): boolean {
    const {genres, yearPreference} = settingsFilter
    if (genres && !this.isMediaValidForGenres(media, genres)) {
      return false
    }
    if (yearPreference && !this.isMediaValidForYear(media, yearPreference!)) {
      return false
    }
    return true;
  }

  isCharacterValidForGender(character:  CharacterPartsFragment,genderType: GenderType) {
    return character.gender === genderType
  }


  filterCharacters(characters: CharacterPartsFragment[], settingsFilter: SettingsFilter) {
    const {genderFilter} = settingsFilter
    if (genderFilter) {
      characters = characters.filter(character => this.isCharacterValidForGender(character, genderFilter))
    }
    return characters
  }


}
