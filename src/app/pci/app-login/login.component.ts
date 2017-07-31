import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { FormText, HintDialog } from '../../libs';
import { Admin } from '../_store/main.state';
import { ERRMSG } from '../_store/static';
import { DialogEdit } from '../../libs/dmodal/dialog/dialog.entity';
import { FormDropdown } from '../../libs/dform/_entity/form-dropdown';
import { EditDialog } from '../../libs/dmodal/dialog/dialog-edit.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginLib: FormText[];
  errorMsg = '';

  constructor(
    @Inject('main') private mainAction,
    @Inject('auth') private authService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.cdr.detectChanges();
  }

  createForm() {
    this.loginForm = this.fb.group({
      name: new FormControl({value: ''}, Validators.required),
      password: new FormControl({value: ''}, Validators.required)
    });
    this.loginLib = [new FormText({
      type: 'text',
      label: '用户名',
      key: 'name',
      value: ''
    }), new FormText({
      type: 'password',
      label: '密码',
      key: 'password',
      value: ''
    })];
  }

  onSubmit(value) {
    if (value.name && value.password) {
      this.authService.login(value)
        .subscribe(res => {
          if (res && res.code === 0 && res.data) {
            this.authService.setJwt(JSON.stringify(res.data));
            this.mainAction.setAdmin(new Admin({id: res.data.id, name: res.data.name}));
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

  edit() {
    const config: DialogEdit = new DialogEdit({
      title: 'edit something',
      form: [new FormText({
        key: 'name',
        label: '医生姓名',
        value: '',
        required: true,
        validated: true,
        order: 1
      }),
        new FormDropdown({
          key: 'hospitalId',
          label: '所属医院',
          value: '',
          required: true,
          options: [{
            id: 1,
            name: 'hospital1'
          }, {
            id: 2,
            name: 'hospital2'
          }, {
            id: 3,
            name: 'hospital3'
          }],
          order: 3
        })]
    });

    EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      // if(result&&result.key)
      console.log(result);
    })
  }
}
