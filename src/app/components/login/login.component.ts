import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth-service.service';
import { AuthToken } from '../../models/Auth/AuthToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  client_id = environment.CLIENT_ID;

  ngOnInit(): void {
    this.route.fragment
      .pipe(
        map((fragment: any) => new URLSearchParams(fragment)),
        map((params) => ({
          access_token: params.get('access_token'),
          token_type: params.get('token_type'),
          expires_in: params.get('expires_in'),
        }))
      )
      .subscribe(async (res) => {
        if (res.access_token && res.expires_in && res.token_type) {
          console.log('user authenticated');
          this.authService.update(res as AuthToken);
        }
      });
  }
}
