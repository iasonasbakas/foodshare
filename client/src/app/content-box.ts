import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'content-box',
  template: `<div class="box" [@scrollAnimation]="state">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/posts.png">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/nav.png">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/messaging.png">
              </div>`,
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})

export class ContentBox {

  state = 'hide'

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop
      const scrollPosition = window.pageYOffset

      if (scrollPosition >= componentPosition) {
        this.state = 'show'
      } else {
        this.state = 'hide'
      }

    }

}
