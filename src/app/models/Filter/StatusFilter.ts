import {MediaListStatus} from "../../graphql/graphql";

export interface StatusFilter {
  status: MediaListStatus,
  checked: boolean
}
