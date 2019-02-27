import { Component, OnInit  } from '@angular/core';

import { Donation } from '../donation';
import { DonationService } from '../donation.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';

import {
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

declare var stripe: any;
declare var elements: any;
import { NgForm } from '@angular/forms';
 

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements AfterViewInit, OnDestroy {

@ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef, private auth: AuthService,
               private userService: UserService) {}

  ngOnInit() {
    if(localStorage.getItem('foodshare-jwt-access-token')){
      this.auth.isLoggedIn = true;
    }
  }

  ngAfterViewInit() {

   const style = {
    base: {
      lineHeight: '24px',
      fontFamily: 'monospace',
      fontSmoothing: 'antialiased',
      fontSize: '19px',
      '::placeholder': {
        color: 'purple'
      }
    }
   };

    this.card = elements.create('card', {style});
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }
  }
}

  /*add(user: string, name: string, amount: number, duration: number, message: string): void {

    user = user.trim();
    name = name.trim();
    message = message.trim()

    if(!user || !name || !amount || !message || !duration) { return };
      this.donationService.addDonation({ user, name, amount, duration, message} as Donation)
        .subscribe( donation => {
          if (donation) {
            this.donations.push(donation);
          }
        });
    }*/
