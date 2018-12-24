import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';
import {select} from "@angular-redux/store";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html'
})
export class RoleEditComponent implements OnInit, OnDestroy {
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
    @Inject('role') private roleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      this.roleService.getMenus(),
      (route, query, menu): any => ({route, query, menu})
    ).subscribe(res => {
      if (res.route.menu) {
        this.paramsMenu = res.route.menu;
      }
      if (res.menu && res.query && res.query.id) {
        this.id = res.query.id;
        this.containerConfig = this.roleService.setRoleEditConfig(true);
        this.getInit(res.query.id);
      } else if (res.menu) {
        this.containerConfig = this.roleService.setRoleEditConfig(false);
        this.form = this.roleService.setRoleForm(res.menu.data);
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

  getInit(id) {
    this.subscribeDetail = this.roleService.getRole(id)
      .subscribe(res => {
        // console.log(res);
        if (res.code === 0 && res.data) {
          this.form = this.roleService.setRoleForm(res.data.menutrue, res.data.content, id);
        } else {
          HintDialog('初始化数据失败，请刷新重试！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('初始化数据失败，请刷新重试！', this.dialog);
      });
  }

  getValue(data) {
    // console.log('==================',data);
    const formData: any = {};
    if (this.id) {
      formData.sysRoleId = this.id;
    }
    // formData.delFlag = 0;
    if (Array.isArray(data.menuIds)) {
      formData.menuIds = data.menuIds.join(',');
    }
    formData.createBy = this.username;
    formData.name = data.name;
    formData.description = data.description;
    this.subscribeSave = this.roleService.updateRole(formData, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog)
            .afterClosed().subscribe(() => {
              this.router.navigate(['/role']);
              // this.router.navigate(['/role', this.paramsMenu]);
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
