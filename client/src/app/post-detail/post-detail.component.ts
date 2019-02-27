import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PostService }  from '../post.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Post } from '../post';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input()
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getPost();
    if(localStorage.getItem('foodshare-jwt-access-token')){
      this.auth.isLoggedIn = true;
    }
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => this.post = post);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.postService.updatePost(this.post)
      .subscribe(() => this.goBack());
  }

}
