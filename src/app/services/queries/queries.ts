import { gql, TypedDocumentNode } from 'apollo-angular';
import { MediaListCollection } from 'src/models/DTO/MediaListCollection';

export const test = gql`
query MediaListCollection($userName: String) {
  MediaListCollection(userName: $userName) {
    user {
      name
    }
  }
}`

export const GET_MEDIA_COLLECTION_FOR_USERNAME = gql<{MediaListCollection: MediaListCollection}, {userName: string}>`
  query MediaListCollection($userName: String) {
    MediaListCollection(userName: $userName, type: ANIME) {
      lists {
        name
        status
        entries {
          id
          media {
            coverImage {
              large
            }
            siteUrl
            title {
              userPreferred
            }
            characters {
              nodes {
                id
                name {
                  full
                  userPreferred
                  native
                }
                image {
                  large
                }
                siteUrl
                favourites
                gender
                dateOfBirth {
                  day
                  month
                }
                bloodType
                age
              }
            }
          }
        }
      }
      user {
        id
        name
        avatar {
          large
        }
      }
    }
  }
`;

