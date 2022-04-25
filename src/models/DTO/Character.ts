import {FuzzyDate} from "./FuzzyDate";

export interface Character {
  id: number,
  name: {
    full: string , userPreferred: string, native: string
  },
  image: {
    large: string
  },
  siteUrl: string,
  favourites: number,
  gender: string |null,
  dateOfBirth: FuzzyDate,
  bloodType: string | null,
  age: string |null,

}
