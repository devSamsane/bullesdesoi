import { Action } from '@ngrx/store';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  SIGNIN = '[Auth] Signin',
  SIGNIN_SUCCESS = '[Auth] Signin Success',
  SIGNIN_FAILURE = '[Auth] Signin Failure'
}

export class Signin implements Action {
  readonly type = AuthActionTypes.SIGNIN;
  constructor(public payload: Credentials) { }
}

export class SigninSuccess implements Action {
  readonly type = AuthActionTypes.SIGNIN_SUCCESS;
  constructor(public payload: { user: User; bdsToken: string ; bdsTokenExpiresIn: number}) { }
}

export class SigninFailure implements Action {
  readonly type = AuthActionTypes.SIGNIN_FAILURE;
  constructor(public payload?: any) { }
}

export type All =
  | Signin
  | SigninSuccess;
