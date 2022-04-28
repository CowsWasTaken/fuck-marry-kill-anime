import { gql } from 'apollo-angular';
import { MediaListCollection } from 'src/models/DTO/MediaListCollection';
import {CharacterRole, MediaListCollectionParts, MediaType} from "../../../generated/graphql";


export const GET_TYPE = gql<{MediaListCollection: MediaListCollection}, {userName: string, type: MediaType, role?: CharacterRole}>`
  ${MediaListCollectionParts}
  query MediaListCollection($userName: String!, $type: MediaType!, $role: CharacterRole) {
    MediaListCollection(userName: $userName, type: $type) {
      ...MediaListCollectionParts
    }
  }
`;

