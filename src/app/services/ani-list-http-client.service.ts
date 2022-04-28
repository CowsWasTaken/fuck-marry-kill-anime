import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {GET_TYPE} from "../graphql/queries/queries";
import {CharacterRole, MediaType} from "../../generated/graphql";

@Injectable({
  providedIn: 'root',
})
export class AniListHttpClientService {
  constructor(private apollo: Apollo) {}

  getUserAndType(userName: string, type: MediaType, role?: CharacterRole) {
    return this.apollo.query({
      query: GET_TYPE,
      variables: {
        userName,
        type,
        role
      },
    });
  }
}
