import {YearFilter} from "./YearFilter";
import {GenderType} from "../GenderType";
import {MediaListStatus, MediaType} from "../../graphql/graphql";

export interface SettingsFilter {
  name: string,
  type: MediaType,
  yearPreference?: YearFilter,
  genres?: string[],
  status?: MediaListStatus[],
  genderFilter?: GenderType
}
