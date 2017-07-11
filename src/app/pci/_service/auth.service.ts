import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../libs/_service/http.service';
import { MainAction } from '../_store/main.action';

const PATH = {
  login: 'api/login', // 登陆
};

@Injectable()
export class AuthService {
  JWT_KEY = 'pci_login_token';
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  @select(['main', 'adminName']) admin: Observable<any>;

  constructor(
    private router: Router,
    @Inject('app') public app,
    private httpService: HttpService,
    private mainAction: MainAction
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
    this.router.navigate(['/login']);
    this.redirectUrl = '';
    this.mainAction.delAdmin();
  }

  isAuthorized(): boolean {
    const admin = window.sessionStorage.getItem(this.JWT_KEY);
    if (admin) {
      console.log(admin);
      this.mainAction.setAdmin({id: JSON.parse(admin).id, name: JSON.parse(admin).name});
    }
    return Boolean(admin);
  }

  getAdminName(): string {
    let name: string;
    this.admin.subscribe(res => {
      name = res;
    });
    return name;
  }
}
