import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Post } from '../post';
import { PostService }  from '../post.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  posts: Post[];
  
  constructor(private route: ActivatedRoute, private userService: UserService,
              private auth: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
    this.getUser();
    if(localStorage.getItem('foodshare-jwt-access-token')){
      this.auth.isLoggedIn = true;
    }
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  getUser(): void {
    const id = this.auth.getUserId()
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

}
