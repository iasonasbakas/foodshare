import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Profile } from './profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profilesUrl = 'api/profiles'
  private postsUrl = 'api/users';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }


  getProfile(id: number): Observable<Profile> {
    const url = `${this.profilesUrl}/${id}`;
    return this.http.get<Profile>(url).pipe(
      tap(_ => this.log(`fetched profile id=${id}`)),
      catchError(this.handleError<Profile>(`getProfile id=${id}`))
    );
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.postsUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getPostUser(id: number): Observable<Profile> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Profile>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<Profile>(`getUser id=${id}`))
    );
  }

  private log(message: string): void {
    this.messageService.add('ProfileService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
