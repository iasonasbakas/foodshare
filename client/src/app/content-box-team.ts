import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'content-box-team',
  template: `<div class="container" [@scrollAnimation]="state">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/gk.png">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/vgo.jpg">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/naf.png">
                <img style="width: 25%; padding-left: 60px;" src="../../assets/img/bak.png">
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
      transition('show => hide', animate('100ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})

export class ContentBoxTeam {

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
