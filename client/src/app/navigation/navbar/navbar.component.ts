import { Component } from '@angular/core';

@Component({
  selector: 'bds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 toggleIconClass = true;

  toggleIcon() {
    this.toggleIconClass = !this.toggleIconClass;
  }
}
