import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { UserService }  from '../user.service';
import { PostService }  from '../post.service';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  posts : Post[];
  user: User;

  constructor(private postService: PostService, private auth: AuthService,
               private userService: UserService) { }

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

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }

  getUser(): void {
    const id = this.auth.getUserId()
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

}
