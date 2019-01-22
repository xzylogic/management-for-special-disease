import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';
import {select} from "@angular-redux/store";
import {AccountService} from "../_service/account.service";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html'
})
export class AccountEditComponent implements OnInit, OnDestroy {
  @select(['main', 'adminName']) readonly adminName: Observable<string>;

  username: string;

  paramsMenu: string;
  id: any;

  subscribeRoute: any;
  subscribeDetail: any;
  subscribeDialog: any;
  subscribeSave: any;

  containerConfig: ContainerConfig;
  form: any;
  errMsg = '';

  constructor(
    @Inject('account') private accountService,
    private AccountService: AccountService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.adminName.subscribe(name => {
      this.username = name;
    })
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query, menu={}): any => ({route, query, menu})
    ).subscribe(res => {
      if (res.query && res.query.id) {
        res.menu = this.AccountService.accountData;
        this.id = res.query.id;
        this.containerConfig = this.AccountService.setAccountEdit(true);
        this.getInit(res.query.id, res);
      } else {
        this.containerConfig = this.AccountService.setAccountEdit(false);
        this.form = this.AccountService.setAddAccountForm();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
  }

  getInit(id, res) {
    this.form = this.AccountService.setAddAccountForm(res.menu, id);
  }

  getValue(data) {
    const formData: any = {};
    if (this.id) {
      formData.sysRoleId = Number(this.id);
    }
    if(data.name && data.password){
      formData.name = data.name;
      formData.password = data.password;
      formData.createBy = this.username;
      if(data.password !== data.checkpwd){
        HintDialog('两次密码输入不一致，请重新输入~', this.dialog);
        return ;
      }
    }
    this.subscribeSave = this.accountService.addAccount(formData)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog)
            .afterClosed().subscribe(() => {
              this.router.navigate(['/account']);
            });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}
