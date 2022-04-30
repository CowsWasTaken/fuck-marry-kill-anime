import {CharacterPartsFragment, Media} from "../../generated/graphql";

export interface CharacterPartsFragmentExtended extends CharacterPartsFragment{
  anime: Media
}
