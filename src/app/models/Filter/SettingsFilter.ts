import {YearFilter} from "./YearFilter";
import {StatusFilter} from "./StatusFilter";
import {MediaListStatus, MediaType} from "../../../generated/graphql";

export interface SettingsFilter {
  name: string,
  type: MediaType,
  yearPreference?: YearFilter,
  genres?: string[],
  status?: MediaListStatus[],
}
