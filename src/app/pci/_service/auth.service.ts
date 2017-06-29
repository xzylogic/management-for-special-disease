import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { HttpService } from '../../libs/_service/http.service';
import { MainState } from '../_store/main.store';
import { SetAdminAction } from '../_store/admin.action';

const PATH = {
  login: 'api/login', // 登陆
};

@Injectable()
export class AuthService {
  JWT_KEY = 'pci_login_token';
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private router: Router,
    @Inject('app') public app,
    private httpService: HttpService,
    private store$: Store<MainState>,
  ) {
  }

  setJwt(jwt: string) {
    window.sessionStorage.setItem(this.JWT_KEY, jwt);
  }

  login(creds) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.login}`, creds);
  }

  logout() {
    window.sessionStorage.removeItem(this.JWT_KEY);
    this.router.navigate(['', 'login']);
    this.redirectUrl = '';
  }

  isAuthorized(): boolean {
    const admin = window.sessionStorage.getItem(this.JWT_KEY);
    if (admin) {
      this.store$.dispatch(new SetAdminAction({id: JSON.parse(admin).id, name: JSON.parse(admin).name}));
    }
    return Boolean(admin);
  }
}
