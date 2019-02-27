import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  posts : Post[];
  post: Post;
  selectedFile: File;

  constructor(private postService: PostService, private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    const userId = this.auth.getUserId();
    this.post = this.newPost(userId);
    if(localStorage.getItem('foodshare-jwt-access-token')){
      this.auth.isLoggedIn = true;
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.http.post('http://localhost:4200/api/media/', this.selectedFile)
    .subscribe(res => {
      console.log(res);
    });
  }

  newPost(userId: number): Post {
    var post = new Post();
    post.user = userId;
    post.product = null;
    post.description = '';
    post.location = '';
    post.upload_date = new Date();
    post.expiration_date = '';
    post.image = null;
    post.avatar = null;
    post.info = '';
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