import { Component, Output, EventEmitter, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';

// tslint:disable-next-line:import-blacklist
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../../authentication/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'bds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('navbarState', [
      state(
        'cleared',
        style({
          backgroundColor: 'rgba(179, 157, 219, 0)',
          boxShadow: 'none'
        })
      ),
      state(
        'intermediate',
        style({
          backgroundColor: 'rgba(179, 157, 219, 0.5)',
          boxShadow: 'none'
        })
      ),
      state(
        'colored',
        style({
          backgroundColor: 'rgba(179, 157, 219, 1)',
          boxShadow:
            '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3)'
        })
      ),
      transition('cleared => intermediate', animate('200ms ease-in')),
      transition('intermediate => colored', animate('300ms ease-in')),
      transition('colored => intermdiate', animate('200ms ease-out')),
      transition('intermediate => cleared', animate('300ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() container: string;
  @Output() isSidenavToggle = new EventEmitter<void>();
  public navbarState = 'cleared';
  private destroyed = new Subject();
  private scrollContainer: any;
  private SCROLL_TOOLBAR_INTERMEDIATE_STATE = 200;
  private SCROLL_TOOLBAR_COLOR_STATE = 700;
  private scrollOffset: any = 0;
  private _rootUrl: string;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    this.router.events.pipe(takeUntil(this.destroyed)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rootUrl = router.url.split('#')[0];
        this._rootUrl = rootUrl;
        this.setNavbarState(rootUrl);
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
    this.user$ = this.authService.user$;

    Promise.resolve().then(() => {
      this.scrollContainer = this.container
        ? this.document.querySelector(this.container)['mat-sidenav-container']
        : window;
      fromEvent(this.scrollContainer, 'scroll')
        .pipe(takeUntil(this.destroyed), debounceTime(10))
        .subscribe(event => {
          this.scrollOffset = this.scrollContainer.window.pageYOffset;
          if (this._rootUrl === '/') {
            this.getScrollOffset(this.scrollOffset);
          }
        });
    });
  }

  // Evite les erreurs undefined et transformation du type en number
  getScrollOffset(scrollValue: any): void {
    if (scrollValue !== 'undefined') {
      this.getNavbarState(scrollValue);
    } else {
      this.navbarState = 'cleared';
    }
  }

  // Récupération du offset Y de la page
  // Passage des valeur du state de la navbar
  getNavbarState(scrollValue: number): void {
    if (scrollValue < this.SCROLL_TOOLBAR_INTERMEDIATE_STATE) {
      this.navbarState = 'cleared';
    } else if (
      scrollValue >= this.SCROLL_TOOLBAR_INTERMEDIATE_STATE &&
      scrollValue <= this.SCROLL_TOOLBAR_COLOR_STATE
    ) {
      this.navbarState = 'intermediate';
    } else if (scrollValue > this.SCROLL_TOOLBAR_COLOR_STATE) {
      this.navbarState = 'colored';
    }
  }

  // Congiguration du state de la navbar en fonction de la route
  setNavbarState(url: string): void {
    if (url !== '/') {
      this.navbarState = 'colored';
    } else {
      this.navbarState = 'cleared';
    }
  }

  toggleSidenav() {
    this.isSidenavToggle.emit();
  }

  ngOnDestroy() {
    this.destroyed.unsubscribe();
  }
}
