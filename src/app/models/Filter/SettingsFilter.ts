import {YearFilter} from "./YearFilter";
import {MediaListStatus, MediaType} from "../../../generated/graphql";
import {GenderType} from "../../components/gender-selection/models/GenderType";

export interface SettingsFilter {
  name: string,
  type: MediaType,
  yearPreference?: YearFilter,
  genres?: string[],
  status?: MediaListStatus[],
  genderFilter?: GenderType
}
