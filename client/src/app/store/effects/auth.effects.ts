import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, empty } from 'rxjs';
import { map, catchError, exhaustMap, tap } from 'rxjs/operators';

import { AuthService } from '../../authentication/auth.service';
import { UIService } from '../../shared/ui/ui.service';
import {
  AuthActionTypes,
  Signin,
  SigninFailure,
  SigninSuccess,
  Signup,
  SignupFailure,
  SignupSuccess
} from '../actions/auth.actions';

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
            this.store.dispatch(new SigninFailure(`Email ou mot de passe invalide`));
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
        this.router.navigateByUrl('/compte');
        this.uiService.showSnackbar(`Authentification réussie`, null, 3000);
      })
    );

  @Effect({ dispatch: false })
  SigninFailure$: Observable<any> = this.actions.ofType(AuthActionTypes.SIGNIN_FAILURE)
    .pipe(
      map((action: SigninFailure) => action.payload),
      tap(message => this.uiService.showSnackbar(`${message}`, null, 3000))
    );

  @Effect()
  Signup: Observable<any> = this.actions.ofType(AuthActionTypes.SIGNUP)
    .pipe(
      map((action: Signup) => action.payload),
      exhaustMap(payload => this.authService.signup(payload)
        .pipe(
          catchError(error => {
            this.store.dispatch(new SignupFailure(`Erreur à la création de l'utilisateur`));
            return empty();
          })
        )
      ),
      map(payload => new SignupSuccess({
        user: payload.user,
        bdsToken: payload.bdsToken,
        bdsTokenExpiresIn: payload.bdsTokenExpiresIn
      })
      )
  );

  @Effect({ dispatch: false })
  SignupSuccess$: Observable<any> = this.actions.ofType(AuthActionTypes.SIGNUP_SUCCESS)
    .pipe(
      map((action: SignupSuccess) => action.payload),
      tap(payload => {
        localStorage.setItem('bdsTokenExpiresIn', payload.bdsTokenExpiresIn);
        localStorage.setItem('bdsToken', payload.bdsToken);
        this.router.navigateByUrl('/compte');
        this.uiService.showSnackbar(`Utilisateur ${payload.user.displayName} créé`, null, 3000);
      })
    );

  @Effect({ dispatch: false })
  SignupFailure$: Observable<any> = this.actions.ofType(AuthActionTypes.SIGNUP_FAILURE)
    .pipe(
      map((action: SigninFailure) => action.payload),
      tap(message => this.uiService.showSnackbar(`${message}`, null, 3000))
    );

}
