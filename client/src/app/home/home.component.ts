import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Post } from '../post';
import { TonesCounter } from '../tones-counter';
import { UsersCounter } from '../users-counter';
import { DonationsCounter } from '../donations-counter';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
