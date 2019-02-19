import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'about', component: AboutComponent },
  { path: 'businesses', component: BusinessesComponent },
  { path: 'faqs', component: FaqsComponent},
  { path: 'volunteer', component: VolunteerComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }