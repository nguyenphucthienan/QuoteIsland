import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.interface';

@Injectable()
export class AuthService {

  private readonly AUTH_URL = `${environment.apiUrl}/auth`;

  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  readTokenFromStorage() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(user: User) {
    return this.http.post(`${this.AUTH_URL}/register`, user);
  }

  login(model: any) {
    return this.http.post(`${this.AUTH_URL}/login`, model)
      .pipe(
        map(({ token }: any) => {
          if (token) {
            localStorage.setItem('token', token);
            this.decodedToken = this.jwtHelper.decodeToken(token);
          }
        })
      );
  }

  logout() {
    this.decodedToken = null;
    localStorage.removeItem('token');
  }

}
