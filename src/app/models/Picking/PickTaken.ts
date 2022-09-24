import {PickOption} from "./PickOption";
import {CharacterPartsFragment} from "../../graphql/graphql";

export interface PickTaken {
  pick: PickOption,
  character: CharacterPartsFragment
}
