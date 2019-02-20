import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';

class Credentials {
  constructor(public username: string, public password: string) {

  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(username, password) : Observable<boolean> {
    const authUrl = `api/token/`;
    var credentials = new Credentials(username, password);
    return this.http
      .post(authUrl, credentials, httpOptions).pipe(
        map(results => {
          if (results['access']) {
            localStorage.setItem('foodshare-jwt-access-token',
                                 results['access']);
            this.isLoggedIn = true;
            if (results['refresh']) {
              localStorage.setItem('foodshare-jwt-refresh-token',
                                   results['refresh']);
            }
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.log(`Login service: ${error}`);
          return of(false);
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('foodshare-jwt-access-token');
    localStorage.removeItem('foodshare-jtw-refresh-token');
  }

  getUserId() : number {
    var token = localStorage.getItem('foodshare-jwt-access-token');
    const decoded = jwt_decode(token);
    const id = decoded.user_id;
    return id;
  }

}