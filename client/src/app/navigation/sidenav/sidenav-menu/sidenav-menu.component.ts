import { Component, Output, EventEmitter, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, Params, Event } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';


import { NavigationItems, NavCategory } from './nav-items';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

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

  @Input() params: Observable<Params>;
  @Output() closeSidenav = new EventEmitter<void>();
  expansions = {};
  private onDestroy = new Subject<void>();

  constructor(public navItems: NavigationItems, private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      startWith(null),
      switchMap(() => this.params),
      takeUntil(this.onDestroy)
    ).subscribe(p => this.setExpansions(p));
  }

  // Close Sidenav
  sidenavClose() {
    this.closeSidenav.emit();
  }

  // Configuration expansion
  setExpansions(params: Params) {
    const categories = this.navItems.getCategories();

    for (const category of categories) {
      if (this.expansions[category.id] === true) {
        continue;
      }
      let match = false;
      for (const item of category.items) {
        if (this.router.url.indexOf(item.route) > 1) {
          match = true;
          break;
        }
      }
      this.expansions[category.id] = match;
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
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}

