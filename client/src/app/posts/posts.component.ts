import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';
import { Identifiers } from '@angular/compiler';
import { User } from '../user';

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

  add(id: number, user: number, location: string, description: string, product: number,  product_photo: string,
        upload_date: string, expiration_date: string, time: string ): void {

    description = description.trim();
    location = location.trim();

    if (!description || !location || !expiration_date || !product || !user) { return; }
    this.postService.addPost({ description, location, expiration_date, upload_date, product_photo, user, product, id, time } as Post)
      .subscribe(post => {
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
