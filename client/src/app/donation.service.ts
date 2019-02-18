import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Donation } from './donation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private donationCreateUrl = 'api/donations/create';
  private donationsUrl = 'api/donations';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getDonation(id: number): Observable<Donation> {
    const url = `${this.donationsUrl}/${id}`;
    return this.http.get<Donation>(url).pipe(
      tap(_ => this.log(`fetched donation id=${id}`)),
      catchError(this.handleError<Donation>(`getDonation id=${id}`))
    );
  }

  addDonation (donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(this.donationCreateUrl, donation , httpOptions).pipe(
      tap((donation: Donation) => this.log(`added donation w/ id=${donation.id}`)),
      catchError(this.handleError<Donation>('addDonation'))
    );
  }

  private log(message: string): void {
    this.messageService.add('DonationService: ' + message);
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