import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';

import { Observable, BehaviorSubject, throwError, pipe } from 'rxjs';
import { switchMap, map, shareReplay, tap, catchError, filter } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Credentials } from '../models/credentials.model';



@Injectable()
export class AuthService {
  // private subject = new BehaviorSubject<User>(undefined);

  // Définition de l'observable user
  // Broadcast du user uniquement si il est définit (!!user)
  // user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));
  // isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);
  // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

  private readonly url = 'https://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  constructor(protected http: HttpClient) { }

  signup(user: User) {
    const body = JSON.stringify(user);
    return this.http
      .post<User>(`${this.url}/api/auth/signup`, body, this.httpOptions);

  }



      // .pipe(
      //   catchError(this.handleError),
      //   shareReplay(),
      //   tap(res => this.setSession(res)),
      //   tap(res => this.subject.next(res)))
      // .pipe(catchError(this.handleError));


  //  signup(user: User): {
  //     const body = JSON.stringify(user);
  //     return this.http
  //       .post<User>(`${this.url}/api/auth/signup`, body, this.httpOptions)
  //       .tap(res => this.setSession(res))
  //       .shareReplay()
  //       .tap(res => this.subject.next(res));
  //   }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // Erreur client ou réseau client
      console.error('Une erreur est survenue: ', error.error.message);
    } else {
      // Erreur serveur
      console.error(`Le serveur a retourné un code erreur ${error.status}, ` + `message: ${error.error}`);
    }
    return (
      'Une erreur est survenue, merci de réessayer'
    );
  }

  private setToken(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('bds-token', authResult.token);
    // localStorage.setItem('bds_expires_at', JSON.stringify(expiresAt.valueOf()));
  }

    signin({email, password}: Credentials): Observable<any> {
      return this.http
        .post<Credentials>(`${this.url}/api/auth/signin`, {email, password}, this.httpOptions);
    }


}
