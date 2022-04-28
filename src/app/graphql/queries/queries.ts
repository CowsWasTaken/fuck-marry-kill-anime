import { gql } from 'apollo-angular';
import {
  CharacterRole,
  MediaListCollectionParts,
  MediaListCollectionPartsFragment,
  MediaType
} from "../../../generated/graphql";


export const GET_TYPE = gql<{MediaListCollection: MediaListCollectionPartsFragment}, {userName: string, type: MediaType, role?: CharacterRole}>`
  ${MediaListCollectionParts}
  query MediaListCollection($userName: String!, $type: MediaType!, $role: CharacterRole) {
    MediaListCollection(userName: $userName, type: $type) {
      ...MediaListCollectionParts
    }
  }
`;

