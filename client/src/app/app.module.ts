import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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


import { NavigationItems } from './navigation/sidenav/sidenav-menu/nav-items';

import { PagesModule } from './pages/pages.module';


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
    AppointmentComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    PagesModule
  ],
  providers: [NavigationItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
