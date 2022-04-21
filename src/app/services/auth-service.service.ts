import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../login/models/AuthToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth_token = new BehaviorSubject<AuthToken | null>(null);

  constructor() {}

  update(authToken: AuthToken) {
    this.auth_token.next(authToken);
  }

  getAuthToken() {
    return this.auth_token;
  }
}
