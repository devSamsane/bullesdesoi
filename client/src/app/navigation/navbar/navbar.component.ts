import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'bds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() isSidenavToggle = new EventEmitter<void>();
  toggleIconClass: boolean;

  toggleIcon() {
    this.toggleIconClass = !this.toggleIconClass;
  }

  toggleSidenav() {
    this.isSidenavToggle.emit();
  }

  ngOnInit() {
    this.toggleIconClass = false;
  }
}
