import { Component } from '@angular/core';

@Component({
  selector: 'users-counter',
  template: `<div counto [step]="100" [countTo]="60" [countFrom]="0" [duration]="1" (countoChange)="counto = $event" (countoEnd)="onCountoEnd()">{{counto}}</div>`,
})
export class UsersCounter {

}