import { Action } from '@ngrx/store';
import { Credentials } from '../../models/credentials.model';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  SIGNIN = '[Auth] Signin',
  SIGNIN_SUCCESS = '[Auth] Signin Success',
  SIGNIN_FAILURE = '[Auth] Signin Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure'
}

export class Signin implements Action {
  readonly type = AuthActionTypes.SIGNIN;
  constructor(public payload: Credentials) { }
}

export class SigninSuccess implements Action {
  readonly type = AuthActionTypes.SIGNIN_SUCCESS;
  constructor(public payload: { user: User; bdsToken: string ; bdsTokenExpiresIn: number }) { }
}

export class SigninFailure implements Action {
  readonly type = AuthActionTypes.SIGNIN_FAILURE;
  constructor(public payload: any) { }
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) { }
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: { user: User; bdsToken: string; bdsTokenExpiresIn: number }) { }
}

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}


export type All =
  | Signin
  | SigninSuccess
  | SigninFailure
  | Signup
  | SignupSuccess
  | SignupFailure;
