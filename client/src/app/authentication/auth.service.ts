import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';

// tslint:disable-next-line:import-blacklist
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';

import { User } from '../models/user';

@Injectable()
export class AuthService {
  private subject = new BehaviorSubject<User>(undefined);

  // Définition de l'observable user
  // Broadcast du user uniquement si il est définit (!!user)
  user$: Observable<User> = this.subject.asObservable().filter(user => !!user);
  isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

  private readonly url = 'https://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient) { }

  signup(user: User): Observable<{} | User> {
    const body = JSON.stringify(user);
    return this.http
      .post<User>(`${this.url}/api/auth/signup`, body, this.httpOptions)
      .do(res => this.setSession(res))
      .shareReplay()
      // tslint:disable-next-line:no-shadowed-variable
      .do(res => this.subject.next(res));
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id-token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }


 }
