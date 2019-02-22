import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';

import { AuthService } from '../auth.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  userId = this.auth.getUserId()

  posts : Post[];
  post: Post;

  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit() {
    const userId = this.auth.getUserId()
    this.post = this.newPost(userId);
  }

  newPost(userId: number): Post {
    var post = new Post();
    post.user = userId;
    post.product = 2;
    post.description = '';
    post.location = '';
    post.upload_date = new Date();
    post.expiration_date = '';

    return post;
  }

  onSubmit() : void {
    this.postService.addPost(this.post)
      .subscribe(post => {
        if (post) {
          this.post = this.newPost(post.user)
        }
      })
  }

}
