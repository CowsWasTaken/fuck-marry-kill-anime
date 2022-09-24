import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AnilistAuthToken} from '../models/Auth/anilist-auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth_token = new BehaviorSubject<AnilistAuthToken | null>(null);

  update(authToken: AnilistAuthToken) {
    this.auth_token.next(authToken);
  }

  getAuthToken() {
    return this.auth_token;
  }
}
