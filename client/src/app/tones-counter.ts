import { Component } from '@angular/core';

@Component({
  selector: 'tones-counter',
  template: `<div counto [step]="100" [countTo]="500" [countFrom]="0" [duration]="1" (countoChange)="counto = $event" (countoEnd)="onCountoEnd()">{{counto}}</div>`,
})
export class TonesCounter {

}