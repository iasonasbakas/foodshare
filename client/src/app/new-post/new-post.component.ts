import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';

import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  posts : Post[];
  post: Post;

  constructor(private postService: PostService, private auth: AuthService, private productService: ProductService) { }

  ngOnInit() {
    const userId = this.auth.getUserId();
    const productId = this.productId
    this.post = this.newPost(userId, productId);
  }

  newPost(userId: number, productId: number): Post {
    var post = new Post();
    post.user = userId;
    post.product = productId;
    post.description = '';
    post.location = '';
    post.upload_date = new Date();
    post.expiration_date = '';
    return post;
  }

  get productId(): number {
    const id = this.productService.productId
    return id;
  }

  onSubmit() : void {
    this.postService.addPost(this.post)
      .subscribe(post => {
        if (post) {
          this.post = this.newPost(post.user, post.product)
        }
      })
  }

}
