import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ItalicsDirective } from './italics.directive';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MessagesComponent } from './message/messages.component';
import { HomeComponent } from './home/home.component';
import { PostSearchComponent } from './post-search/post-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ItalicsDirective,
    PostDetailComponent,
    MessagesComponent,
    HomeComponent,
    PostSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
