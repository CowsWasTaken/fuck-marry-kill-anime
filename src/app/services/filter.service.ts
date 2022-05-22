import { Injectable } from '@angular/core';
import {MediaListCollectionPartsFragment, MediaPartsFragment} from "../../generated/graphql";
import {YearFilter} from "../models/Filter/YearFilter";
import {YearFilterType} from "../models/Filter/YearFilterType";
import {SettingsFilter} from "../models/Filter/SettingsFilter";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterForSettingsFilter(mediaListCollection: MediaListCollectionPartsFragment, settingsFilter: SettingsFilter) {
    const {genres, yearPreference} = settingsFilter
    let arr : MediaListCollectionPartsFragment[] = []
    for (let list of mediaListCollection.lists!) {
      for ( let entry of list!.entries!) {
        // TODO
      }
    }
  }

  filterYear(mediaListCollection: MediaListCollectionPartsFragment, yearFilter: YearFilter) {
    return mediaListCollection.lists!.filter(list => list?.entries!.filter(entry => this.isMediaValidForYear(entry?.media!, yearFilter)))
  }

  filterGenres(mediaListCollection: MediaListCollectionPartsFragment, genres: string[]) {
    return mediaListCollection.lists!.filter(list => list?.entries!.filter(entry => this.isMediaValidForGenres(entry?.media!, genres)))
  }

  isMediaValidForGenres(media: MediaPartsFragment, genres: string[]) {
    for (const genre of media.genres!) {
      if (!genres.includes(genre!)) {
        return false
      }
    }
    return true
  }

  isMediaValidForYear(media: MediaPartsFragment, yearFilter: YearFilter) {
    switch (yearFilter.filterType) {
      case YearFilterType.disabled:
        return true
      case YearFilterType.equal:
        return media.seasonYear! === yearFilter.year
      case YearFilterType.after:
        return media.seasonYear! >= yearFilter.year
      case YearFilterType.before:
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


}
