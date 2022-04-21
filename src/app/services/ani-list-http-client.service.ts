import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { GET_MEDIA_COLLECTION_FOR_USERNAME } from './queries/queries';

@Injectable({
  providedIn: 'root',
})
export class AniListHttpClientService {
  constructor(private apollo: Apollo) {}

  getUserAnime(userName: string) {
    return this.apollo.query({
      query: GET_MEDIA_COLLECTION_FOR_USERNAME,
      variables: {
        userName,
      },
    });
  }
}
