import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AniListHttpClientService {
  private mediaQuery: QueryRef<{ Media: Media }, { id: number }>;

  constructor(private http: HttpClient, private apollo: Apollo) {
    makeRequest();
    this.mediaQuery = this.apollo.watchQuery({
      query: gql`
        query Media($id: Int) {
          Media(id: $id, type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
          }
        }
      `,
    });
  }

  async getMedia(id: number) {
    const result = await this.mediaQuery.refetch({ id });
    console.log(result);
    return result.data.Media
  }

  test(): Observable<any> {
    return this.http.post(
      'https://graphql.anilist.co/',
      '{\n' +
        '  Media(id: 1) {\n' +
        '    title {\n' +
        '      romaji\n' +
        '      english\n' +
        '      native\n' +
        '      userPreferred\n' +
        '    }\n' +
        '    characters {\n' +
        '      nodes {\n' +
        '        id\n' +
        '        siteUrl\n' +
        '      \timage {\n' +
        '      \t  large\n' +
        '      \t  medium\n' +
        '      \t}\n' +
        '        \n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}'
    );
  }
}

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
  id: 15125,
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

// Make the HTTP Api request
function makeRequest() {
  return fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);
}

function handleResponse(response: any) {
  return response.json().then(function (json: any) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data: any) {
  console.log(data);
}

function handleError(error: any) {
  alert('Error, check console');
  console.error(error);
}

export interface Media {
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
}
