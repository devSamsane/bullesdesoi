import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthService } from '../../authentication/auth.service';
import { Signin, AuthActionTypes, SigninFailure, SigninSuccess } from '../actions/auth.actions';
import { Observable, empty } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { UIService } from '../../shared/ui/ui.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<any>,
    private uiService: UIService
  ) { }

  @Effect()
  Signin$: Observable<any> = this.actions
    .ofType(AuthActionTypes.SIGNIN)
    .pipe(
      map((action: Signin) => action.payload),
      exhaustMap(credentials => this.authService.signin(credentials)
        .pipe(
          catchError(error => {
            this.store.dispatch(new SigninFailure('Email ou mot de passe invalides'));
            return empty();
          })
        )
      ),
      map(payload => new SigninSuccess({
          user: payload.user,
          bdsToken: payload.bdsToken,
          bdsTokenExpiresIn: payload.bdsTokenExpiresIn
        })
      )
    );

  @Effect({ dispatch: false })
  SigninSuccess$: Observable<any> = this.actions.ofType(AuthActionTypes.SIGNIN_SUCCESS)
    .pipe(
      map((action: SigninSuccess) => action.payload),
      tap(payload => {
        localStorage.setItem('bdsTokenExpiresIn', payload.bdsTokenExpiresIn);
        localStorage.setItem('bdsToken', payload.bdsToken);
        this.router.navigateByUrl('/');
        this.uiService.showSnackbar(`Utilisateur ${payload.user.displayName} créé`, null, 3000);
    }));


}
