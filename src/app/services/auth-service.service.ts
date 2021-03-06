import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthToken} from '../models/Auth/AuthToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth_token = new BehaviorSubject<AuthToken | null>(null);

  update(authToken: AuthToken) {
    this.auth_token.next(authToken);
  }

  getAuthToken() {
    return this.auth_token;
  }
}
