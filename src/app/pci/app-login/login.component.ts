import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { AuthService } from '../_service/auth.service';
import { HintDialog } from '../../libs/dmodal/dialog/dialog.component';
import { ERRMSG } from '../_store/static';
import { MainAction } from '../_store/main.action';
import { Admin } from '../_store/main.state';
import { FormText } from '../../libs/dform/_entity/form-text';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginLib: FormText[];
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MdDialog,
    private _authService: AuthService,
    private mainAction: MainAction
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      name: new FormControl({value: ''}, Validators.required),
      password: new FormControl({value: ''}, Validators.required)
    });
    this.loginLib = [new FormText({
      type: 'text',
      label: '用户名',
      key: 'name'
    }), new FormText({
      type: 'password',
      label: '密码',
      key: 'password'
    })];
  }

  onSubmit(value) {
    if (value.name && value.password) {
      this._authService.login(value)
        .subscribe(res => {
          if (res && res.code === 0 && res.data) {
            this._authService.setJwt(JSON.stringify(res.data));
            this.mainAction.setAdmin(new Admin({id: res.data.id, name: res.data.name}));
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
