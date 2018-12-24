import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post: Post = {
    id: 1,
    user: 1,
    location: 'Kalamata',
    product: 1,
    description: 'Call me!',
    expiration_date: '07/09/2018',
    upload_date: '06/09/2018',
    time: '15.00',
    product_photo: 'ok.jpg'
  
  }

  posts : Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getBooks(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

}
