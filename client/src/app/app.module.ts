import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './_material/material.module';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { SidenavLogoComponent } from './navigation/sidenav/sidenav-logo/sidenav-logo.component';
import { SidenavMenuComponent } from './navigation/sidenav/sidenav-menu/sidenav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SidenavLogoComponent,
    SidenavMenuComponent,
    NavbarComponent,
    FooterComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
