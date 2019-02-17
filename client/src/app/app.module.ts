import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountoModule } from 'angular2-counto';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ItalicsDirective } from './italics.directive';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MessagesComponent } from './message/messages.component';
import { HomeComponent } from './home/home.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { LoginComponent } from './login/login.component';
import { DonationComponent } from './donation/donation.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { TonesCounter } from './tones-counter';
import { UsersCounter } from './users-counter';
import { DonationsCounter } from './donations-counter';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ItalicsDirective,
    PostDetailComponent,
    MessagesComponent,
    HomeComponent,
    PostSearchComponent,
    LoginComponent,
    DonationComponent,
    RegisterComponent,
    UserComponent,
    TonesCounter,
    UsersCounter,
    DonationsCounter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CountoModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
