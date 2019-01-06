import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Post } from './post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private postsUrl = 'api/posts';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  /** GET post by id. Will 404 if id not found */
  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  /** POST: add a new post to the server */
  addPost (post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post , httpOptions).pipe(
      tap((post: Post) => this.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  /** PUT: update the post on the server */
  updatePost (post: Post): Observable<any> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put(url, post, httpOptions).pipe(
      tap(_ => this.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  /** DELETE: delete the post from the server */
  deletePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  /* GET posts whose location contains search term */
  searchPosts(term: string): Observable<Post[]> {
    if (!term.trim()) {
      // if not search term, return empty post array.
      return of([]);
    }
    return this.http.get<Post[]>(`api/posts/?location=${term}`).pipe(
      tap(_ => this.log(`found posts matching "${term}"`)),
      catchError(this.handleError<Post[]>('searchPosts', []))
    );
  }

  private log(message: string): void {
    this.messageService.add('Postervice: ' + message);
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
