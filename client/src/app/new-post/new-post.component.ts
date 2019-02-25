import { Component, OnInit } from '@angular/core';

import { Post } from '../post';
import { PostService } from '../post.service';

import { AuthService } from '../auth.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  posts : Post[];
  post: Post;
  selectedFile: ImageSnippet;

  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit() {
    const userId = this.auth.getUserId();
    this.post = this.newPost(userId);
  }

  newPost(userId: number): Post {
    var post = new Post();
    post.user = userId;
    post.product = '';
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.postService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        })
    });

    reader.readAsDataURL(file);
  }
}

