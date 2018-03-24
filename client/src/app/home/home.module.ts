import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeLandingComponent } from './home-landing/home-landing.component';
import { HomeDescriptionComponent } from './home-description/home-description.component';
import { HomeApplicationsComponent } from './home-applications/home-applications.component';
import { HomeContactComponent } from './home-contact/home-contact.component';

@NgModule({
  imports: [],
  exports: [],
  declarations: [
    HomeComponent,
    HomeLandingComponent,
    HomeDescriptionComponent,
    HomeApplicationsComponent,
    HomeContactComponent
    ],
  providers: [],
})
export class HomeModule { }
