import { Component, Output, EventEmitter, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { NavigationItems, NavCategory } from './nav-items';

@Component({
  selector: 'bds-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class SidenavMenuComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();

  // Déclaration expanse menu
  expansions: any = {};

  constructor(public navItems: NavigationItems) {}

  ngOnInit() {

  }

  // Close Sidenav
  sidenavClose() {
    this.closeSidenav.emit();
  }

  // Configuration expansion
  setExpansions() {
    const categories = this.navItems.getCategories();

    for (const category of categories) {
      if (this.expansions[category.id] === true) {
        continue;
      }

      this.expansions[category.id] = true;
    }
  }

  // Etat state expansion
  getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  // Toggle state expanded
  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  // Expanded : true | false
  getExpanded(category: string): boolean {
    return this.expansions[category];
  }

  ngOnDestroy() {

  }
}

