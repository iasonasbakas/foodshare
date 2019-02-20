import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';
import { Identifiers } from '@angular/compiler';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { tokenKey } from '@angular/core/src/view';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  userId = this.auth.getUserId()

  posts : Post[];

  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  add(user: number, location: string, description: string, product: number,  product_photo: string, expiration_date: string): void {

    description = description.trim();
    location = location.trim();

    if (!description || !location || !expiration_date || !product || !user) { return; }
    this.postService.addPost({ user, location, description, product, product_photo, expiration_date } as Post)
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
