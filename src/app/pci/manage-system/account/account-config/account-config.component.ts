import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';
import {select} from "@angular-redux/store";

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html'
})
export class AccountConfigComponent implements OnInit, OnDestroy {
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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      this.accountService.getAllRole(),
      (route, query, menu): any => ({route, query, menu})
    ).subscribe(res => {
      console.log('-------',res)
      if (res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res.menu && res.query && res.query.id) {
        this.id = res.query.id;
        this.containerConfig = this.accountService.setAccountConfig(true);
        this.getInit(res.query.id, res);
      } else if (res.menu) {
        this.containerConfig = this.accountService.setAccountConfig(false);
        this.form = this.accountService.setAccountForm(res.menu.data);
      }
    });
    this.adminName.subscribe(name => {
      this.username = name;
    })
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
    this.form = this.accountService.setAccountForm(res.menu.data, id);
  }

  getValue(data) {
    const formData: any = {};
    if (this.id) {
      formData.adminId = this.id;
    }
    formData.roleId = data.roleId;
    this.subscribeSave = this.accountService.addAdminRole(formData, this.id)
      .subscribe(res => {
        console.log(res)
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
