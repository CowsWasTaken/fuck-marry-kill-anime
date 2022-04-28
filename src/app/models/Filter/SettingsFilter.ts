import {YearFilter} from "./YearFilter";
import {StatusFilter} from "./StatusFilter";

export interface SettingsFilter {
  name?: string,
  yearPreference?: YearFilter,
  genres?: string[],
  status?: StatusFilter[],
  type?: string
}
