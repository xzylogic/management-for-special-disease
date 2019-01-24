import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';
import {select} from "@angular-redux/store";
import {RoleService} from "../_service/role.service";

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
    private RoleService: RoleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query, menu={}): any => ({route, query, menu})
    ).subscribe(res => {
      // console.log('-------',res)
      if (res.query && res.query.id) {
        res.menu = this.RoleService.roleData;
        this.id = res.query.id;
        this.containerConfig = this.RoleService.setRoleEditConfig(true);
        this.form = this.RoleService.setRoleForm(res.menu, res.query.id);
        // this.getInit(res.query.id);
      } else {
        this.containerConfig = this.RoleService.setRoleEditConfig(false);
        this.form = this.RoleService.setRoleForm(res.menu.data);
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

  // getInit(id) {
  //   this.subscribeDetail = this.roleService.getRole(id)
  //     .subscribe(res => {
  //       // console.log(res);
  //       if (res.code === 0 && res.data) {
  //         this.form = this.roleService.setRoleForm(res.data.content, id);
  //       } else {
  //         HintDialog('初始化数据失败，请刷新重试！', this.dialog);
  //       }
  //     }, err => {
  //       console.log(err);
  //       HintDialog('初始化数据失败，请刷新重试！', this.dialog);
  //     });
  // }

  getValue(data) {
    // console.log('==================',data);
    const formData: any = {};
    if (this.id) {
      formData.sysRoleId = this.id;
    }
    // formData.delFlag = 0;
    // if (Array.isArray(data.menuIds)) {
    //   formData.menuIds = data.menuIds.join(',');
    // }
    formData.createBy = this.username;
    formData.name = data.name;
    formData.description = data.description;
    // console.log('-----+++++',formData);
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
