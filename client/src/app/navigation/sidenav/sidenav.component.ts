import { Component, OnInit } from '@angular/core';

import { NavigationItems } from './sidenav-menu/nav-items';

@Component({
  selector: 'bds-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public navItems: NavigationItems) { }

  ngOnInit() {

  }
}
