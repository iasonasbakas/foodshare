import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap, tap, catchError
 } from 'rxjs/operators';


import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent {

  public model: any;
  searching = false;
  searchFailed = false;

  public posts$: Observable<Post[]>;

  constructor(private router: Router,
              private bookService: PostService) {}

  // Push a search term into the observable stream.
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
                this.bookService.searchPosts(term).pipe(
                  tap(() => this.searchFailed = false),
                  catchError(() => {
                    console.log('Failed!');
                    this.searchFailed = true;
                    return of([]);
                  }))
               ),
      tap(() => {this.searching = false;})
    )

  formatter(b: Post): string {
    return b.location;
  }

  selectedItem(event) : void {
    var post = event.item;
    this.router.navigate([`/posts/${post.id}`]);
  }

}
