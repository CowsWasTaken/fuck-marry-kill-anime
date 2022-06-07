import {gql} from 'apollo-angular';
import {
  AniChartUserParts, AniChartUserPartsFragment,
  Character,
  CharacterParts,
  CharacterPartsFragment,
  CharacterRole,
  MediaListCollectionParts,
  MediaListCollectionPartsFragment,
  MediaListStatus,
  MediaType
} from "../../../generated/graphql";


export const GET_TYPE = gql<{ MediaListCollection: MediaListCollectionPartsFragment }, { userName: string, type: MediaType, role?: CharacterRole, status_in?: MediaListStatus[] }>`
  ${MediaListCollectionParts}
  query MediaListCollection($userName: String!, $type: MediaType!, $status_in: [MediaListStatus], $role: CharacterRole) {
    MediaListCollection(userName: $userName, type: $type, status_in: $status_in) {
      ...MediaListCollectionParts
    }
  }
`;

// for fetching Genres dynamically
export const GET_GENRES = gql<{ GenreCollection: string[] }, {}>`
  query GenreCollection {
    GenreCollection
  }`

export const TOGGLE_FAVOURITE = gql<{ Character: CharacterPartsFragment }, { animeId?: number, mangaId?: number, characterId?: number, staffId?: number, studioId?: number }>`
  ${CharacterParts}
  mutation {
    ToggleFavourite(characterId: 121514) {
      characters {
        nodes {
          ...CharacterParts
        }
      }
    }
  }`

export const GET_USER_WITH_FAVOURITES = gql<{ AniChartUser: AniChartUserPartsFragment }, {}>`
${AniChartUserParts}
query User {
  AniChartUser {
    ...AniChartUserParts
  }
}
`

