import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GET_TYPE, TOGGLE_FAVOURITE} from "../graphql/queries/queries";
import {CharacterRole, MediaListStatus, MediaType} from "../../generated/graphql";
import {AuthService} from "./auth-service.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AniListHttpClientService {
  constructor(private apollo: Apollo, private authService: AuthService) {}

  getUserAndType(userName: string, type: MediaType, role?: CharacterRole, status_in?: MediaListStatus[]) {
    return this.apollo.query({
      query: GET_TYPE, variables: {
        userName, type, role, status_in
      },
    });
  }

  toggleFavourite( mangaId?: number, characterId?: number, staffId?: number, studioId?: number) {
    const authToken= this.getAuthToken();
    if (!authToken) {
      throw new Error('Cannot make mutation without auth token from user')
    }
    return this.apollo.mutate({
      mutation: TOGGLE_FAVOURITE, variables: {
        mangaId, characterId, staffId, studioId
      }, context : {
        headers: new HttpHeaders().set("Authorization", "Bearer " + authToken.access_token),
      }
    })
  }

  private getAuthToken() {
    return this.authService.getAuthToken().getValue();
  }


}
