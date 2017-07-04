import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextEntity } from '../../libs/dform/component/lib-input/lib-input-text';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { MainState } from '../_store/main.store';
import { Store } from '@ngrx/store';
import { AuthService } from '../_service/auth.service';
// import { SetAdminAction } from '../_store/admin.action';
import { HintDialog } from '../../libs/dmodal/dialog/dialog.component';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginLib: InputTextEntity[];
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MdDialog,
    private store$: Store<MainState>,
    private _authService: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      name: new FormControl({value: ''}, Validators.required),
      password: new FormControl({value: ''}, Validators.required)
    });
    this.loginLib = [{
      type: 'text',
      label: '用户名',
      controlName: 'name'
    }, {
      type: 'password',
      label: '密码',
      controlName: 'password'
    }];
  }

  onSubmit(value) {
    if (value.name && value.password) {
      this._authService.login(value)
        .subscribe(res => {
          if (res && res.code === 0 && res.data) {
            this._authService.setJwt(JSON.stringify(res.data));
            // this.store$.dispatch(new SetAdminAction({id: res.data.id, name: res.data.name}));
            this.router.navigate(['']);
          } else {
            this.errorMsg = res.msg || ERRMSG.loginErr;
            HintDialog(this.errorMsg, this.dialog);
          }
        }, err => {
          console.log(err);
          this.errorMsg = ERRMSG.netErrMsg;
          HintDialog(this.errorMsg, this.dialog);
        });
    }
  }
}
