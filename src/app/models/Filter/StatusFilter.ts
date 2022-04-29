import {MediaListStatus} from "../../../generated/graphql";

export interface StatusFilter {
  status: MediaListStatus,
  checked: boolean
}
