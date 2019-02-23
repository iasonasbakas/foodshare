import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodShare';

  constructor(private auth: AuthService, private userService: UserService) {}

  user: User;

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    const id = this.auth.getUserId()
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }


}
