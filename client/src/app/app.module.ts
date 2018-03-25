import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MaterialModule } from './_material/material.module';

import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { SidenavLogoComponent } from './navigation/sidenav/sidenav-logo/sidenav-logo.component';
import { SidenavMenuComponent } from './navigation/sidenav/sidenav-menu/sidenav-menu.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { HomeComponent } from './home/home.component';
import { HomeLandingComponent } from './home/home-landing/home-landing.component';
import { HomeDescriptionComponent } from './home/home-description/home-description.component';
import { HomeApplicationsComponent } from './home/home-applications/home-applications.component';
import { HomeContactComponent } from './home/home-contact/home-contact.component';

import { NavigationItems } from './navigation/sidenav/sidenav-menu/nav-items';

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './shared/map/map.component';
import { RecaptchaDirective } from './shared/recaptcha/recaptcha.directive';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavLogoComponent,
    SidenavMenuComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    AppointmentComponent,
    MapComponent,
    HomeComponent,
    HomeLandingComponent,
    HomeDescriptionComponent,
    HomeApplicationsComponent,
    HomeContactComponent,
    RecaptchaDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    PagesModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBEidIrV8EFlQRyt_ra6qcCoBlJTev1mtE' })
  ],
  providers: [NavigationItems],
  bootstrap: [AppComponent]
})
export class AppModule {}
