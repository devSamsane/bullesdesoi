import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { NavigationItems } from './sidenav-menu/nav-items';


@Component({
  selector: 'bds-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  params: Observable<Params>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.params = combineLatest(
      this.activatedRoute.pathFromRoot.map(route => route.params), Object.assign
    );
  }
}
