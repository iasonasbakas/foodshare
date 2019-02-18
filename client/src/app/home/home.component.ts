import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

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

    windowScrolled: boolean;
    constructor(@Inject(DOCUMENT) private document: Document) { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } 
       else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    
    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }

  	ngOnInit() { }

  	@ViewChild('counters') public counters:ElementRef;

  	public move():void {
  		this.counters.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
	}



}
