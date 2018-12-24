import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  posts : Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  add(description: string, location: String, expiration_date: string,
    upload_date: string, product_photo: string, user: number, product: number, id: number, time: string ): void {

    description = description.trim();
    location = location.trim();
    if (!description || !location || !expiration_date ||! product || !user) { return; }
    this.postService.addPost({ description, location, expiration_date, upload_date, product_photo, user, product, id, time } as Post)
      .subscribe(post => {
        // If the operation has failed, postService's handleError()
        // will have given an empty result; so we add to the
        // posts array only if a non-empty result has been produced.
        if (post) {
          this.posts.push(post);
        }
      });
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }

}
