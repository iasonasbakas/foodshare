import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService }  from '../user.service';
import {AuthService} from '../auth.service';

import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
  ) { }

  userId = this.auth.getUserId()

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.userId;
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

}
