import { Component, OnInit } from '@angular/core';

import { Donation } from '../donation';
import { DonationService } from '../donation.service';

import { NgxBraintreeModule } from 'ngx-braintree';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  donations : Donation[] = [];

  constructor(private donationService: DonationService) { }

  ngOnInit() {
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

}
