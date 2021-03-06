import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_MEDIA, GET_USER_WITH_FAVOURITES, TOGGLE_FAVOURITE} from "../graphql/queries/queries";
import {CharacterRole, MediaListStatus, MediaType} from "../../generated/graphql";
import {AuthService} from "./auth-service.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AniListHttpClientService {
  constructor(private apollo: Apollo, private authService: AuthService) {
  }


  getMedia(userName: string, type: MediaType, role?: CharacterRole, status_in?: MediaListStatus[]) {
    return this.apollo.query({
      query: GET_MEDIA, variables: {
        userName, type, role, status_in
      }
    });
  }

  toggleFavouriteCharacter(characterId: number) {

    return this.apollo.mutate({
      mutation: TOGGLE_FAVOURITE, variables: {
        characterId
      }, context: {
        headers: this.getAuthHeader()
      }
    })
  }

  getUserWithFavourites() {

    return this.apollo.query({
      query: GET_USER_WITH_FAVOURITES, context: {
        headers: this.getAuthHeader()
      }
    })
  }

  getAuthHeader(): HttpHeaders {
    const authToken = this.getAuthToken();
    if (!authToken) {
      throw new Error('Cannot make User Information Request without auth token from user')
    }
    return new HttpHeaders().set("Authorization", "Bearer " + authToken.access_token)
  }

  private getAuthToken() {
    return this.authService.getAuthToken().getValue();
  }


}
