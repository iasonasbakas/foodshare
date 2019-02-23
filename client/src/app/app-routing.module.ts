import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxBraintreeModule } from 'ngx-braintree';
import { HttpClientModule } from '@angular/common/http';

import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LoginComponent } from './login/login.component';
import { DonationComponent } from './donation/donation.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { FaqsComponent } from './faqs/faqs.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VisionComponent } from './vision/vision.component';
import { TeamComponent } from './team/team.component';
import { SupportComponent } from './support/support.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'newpost', component: NewPostComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'about', component: AboutComponent },
  { path: 'businesses', component: BusinessesComponent },
  { path: 'faqs', component: FaqsComponent},
  { path: 'volunteer', component: VolunteerComponent},
  { path: 'about/vision', component: VisionComponent },
  { path: 'about/team', component: TeamComponent },
  { path: 'about/support', component: SupportComponent },
  { path: 'messages', component: ChatComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), NgxBraintreeModule, HttpClientModule ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }