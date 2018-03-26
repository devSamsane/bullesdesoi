import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as fs from 'fs';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

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
  private _authenticated = false;

  // Définition de l'observable user
  // Broadcast du user uniquement si il est définit (!!user)
  user$: Observable<User> = this.subject.asObservable().filter(user => !!user);
  // isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);
  // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

  private readonly url = 'https://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient) { }

  public signup(user: User): Observable<{} | User> {
    const body = JSON.stringify(user);
    return this.http
      .post<User>(`${this.url}/api/auth/signup`, body, this.httpOptions)
      .do(res => this.setToken(res))
      .shareReplay()
      // tslint:disable-next-line:no-shadowed-variable
      .do(user => {
        this.subject.next(user);
        this._authenticated = true;
      });
  }

  private setToken(authResult) {
    localStorage.setItem('bds-token', authResult.token);
  }

  public authenticate(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.url}/api/auth/signin`, { email: email, password: password }, this.httpOptions)
      .shareReplay()
      .do(res => this.setToken(res))
      .do(user => {
        this.subject.next(user);
        this._authenticated = true;
      });
  }

  public authenticated(): Observable<boolean> {
    if (moment().isBefore(this.getExpiration())) {
      this._authenticated = true;
    } else {
      this._authenticated = false;
    }
    return Observable.of(this._authenticated);
  }

  public authenticatedUser(): Observable<User> {
    return this.user$;
  }

  public signout(): Observable<boolean> {
    localStorage.removeItem('bds-token');
    this._authenticated = false;
    return Observable.of(true);
  }

  private getExpiration(): moment.Moment {
    const token: any = localStorage.getItem('bds-token');
    const publicKey = fs.readFileSync('../../assets/keys/cert.pem');
    const payload: any = jwt.verify(token, publicKey);
    return moment(payload.expiresIn);
  }

 }
