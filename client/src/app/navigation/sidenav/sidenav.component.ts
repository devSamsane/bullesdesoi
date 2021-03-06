import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// tslint:disable-next-line:import-blacklist
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationItems } from './sidenav-menu/nav-items';


@Component({
  selector: 'bds-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  params: Observable<Params>;
  private destroyed = new Subject();
  public url: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.pipe(takeUntil(this.destroyed)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rootUrl = router.url.split('#')[0];
        this.url = rootUrl;
      }
    });
  }

  ngOnInit() {
    this.params = combineLatest(
      this.activatedRoute.pathFromRoot.map(route => route.params), Object.assign
    );
  }

  setSectionMargin (url: string): boolean {
    if (url === '/') {
      return false;
    } else if (url === '/signin') {
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.destroyed.unsubscribe();
  }


}
