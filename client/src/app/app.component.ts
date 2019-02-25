import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user';
import { Post } from './post';
import { PostService }  from './post.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FoodShare';

  constructor(private postService: PostService, private auth: AuthService,
               private userService: UserService) {}

  user: User;
  posts: Post[];

  ngOnInit() {
    this.getPosts();
    this.getUser()
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
