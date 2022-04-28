import {PickOption} from "./PickOption";
import {CharacterPartsFragment} from "../../../generated/graphql";

export interface PickTaken {
  pick: PickOption,
  character: CharacterPartsFragment
}
