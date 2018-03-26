import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true;
  }
 }
