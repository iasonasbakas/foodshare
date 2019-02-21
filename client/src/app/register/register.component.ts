import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users : User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  add(username: string, email: string, password: string, first_name: string, last_name: string): void {

    username = username.trim();
    email = email.trim();
    first_name = first_name.trim();
    last_name = last_name.trim();

    if(!first_name || !last_name || !email || !username || !password) { return };
      this.userService.addUser({ username, email, password, first_name, last_name} as User)
        .subscribe( user => {
          if (user) {
            this.users.push(user);
          }
        });
    }

}
