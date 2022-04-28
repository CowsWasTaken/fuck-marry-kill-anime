import {PickOption} from "./PickOption";
import {CharacterPartsFragment} from "../generated/graphql";

export interface TakenPick {
  pick: PickOption,
  character: CharacterPartsFragment
}
