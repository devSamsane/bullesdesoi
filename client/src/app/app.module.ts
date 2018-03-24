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
import { HomeComponent } from './home/home.component';



import { NavigationItems } from './navigation/sidenav/sidenav-menu/nav-items';

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './shared/map/map.component';


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
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    PagesModule,
    HomeModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBEidIrV8EFlQRyt_ra6qcCoBlJTev1mtE' })
  ],
  providers: [NavigationItems],
  bootstrap: [AppComponent]
})
export class AppModule {}
