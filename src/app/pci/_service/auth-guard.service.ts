import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private _loginService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this._loginService.isAuthorized()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this._loginService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);

    return false;
  }
}
