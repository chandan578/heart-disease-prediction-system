import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const homeRoutes: Routes = [
  { path: '', component: HomeComponent} ,
  { path: 'about', component: AboutUsComponent},
  { path: 'contact', component: ContactUsComponent}
];
