import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';


import { POSTS } from './mock-books';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private messageService: MessageService) { }

  getPosts(): Observable<Post[]> {
    this.messageService.add('PostService: fetched posts');
    return of(POSTS);
  }

  getPost(id: number): Observable<Post> {
    this.messageService.add(`PostService: fetched post id=${id}`);
    return of(POSTS.find(post => post.id === id));
  }

}
