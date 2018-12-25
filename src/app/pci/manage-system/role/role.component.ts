import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { RoleService } from './_service/role.service';
import { RoleTableService } from './_service/role-table.service';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import {MatDialogComponent} from "../matDialog/matDialog.component";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit {

  containerConfig: ContainerConfig;
  roleTable: TableOption;

  subscribeHDialog: any;
  subscribeDel: any;
  // paramsMenu: string; // menuId

  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private roleService: RoleService,
    private roleTableService: RoleTableService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.roleService.roleConfig();
    this.roleTable = new TableOption({
      titles: this.roleTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.roleTable.queryKey = '';
    this.getsystemRole(0);
  }

  // formatList(list) {
  //   if (typeof list === 'object') {
  //     list.forEach(obj => {
        // console.log(obj.operation);
        // obj.operation = obj.enable ? '禁用' : '启用';
        // obj.enable = obj.enable ? '可用' : '禁用';
  //     });
  //   }
  // }

  gotoHandle(res) {
    // console.log(res);
    if (res.key === 'edit' && res.value) {
      this.router.navigate(['/role', 'edit'], {queryParams: {id: res.value.id}});
    }
    if (res.key === 'config' && res.value) {
      console.log(res)
      this.dialog.open(MatDialogComponent,{});
    }
    if (res.key === 'enable' && res.value) {
      this.subscribeHDialog = HintDialog(
        `你确定要${res.value.enable === true ? '禁用' : '启用'}角色：${res.value.name}？`,
        this.dialog
      ).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          const enable = res.value.enable === true ? 1 : 0;
          this.enableMenu(res.value.id, enable);
        }
      });
    }
    if (res.key === 'del' && res.value) {
      // console.log(res);
      this.subscribeHDialog = HintDialog(
        `你确定要删除角色：${res.value.name}？`,
        this.dialog
      ).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          this.enableMenu(res.value.id, -1);
        }
      });
    }
  }

  getsystemRole(page: number) {
    this.roleTable.reset(page);
    // console.log(page, this.roleTable.size, this.roleTable.queryKey)
    this.roleService.getData(page, this.roleTable.size, this.roleTable.queryKey)
      .subscribe(
        res => {
          this.roleTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.roleTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            // this.formatList(res.data.content);
            this.roleTable.totalPage = res.data.totalPages;
            this.roleTable.lists = res.data.content;
          } else {
            this.roleTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.roleTable.loading = false;
          console.log(err);
          this.roleTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  newData() {
    this.router.navigate(['/role', 'edit']);
  }

  enableMenu(id, flag) {
    this.subscribeDel = this.roleService.enableRole(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '操作成功！', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败～', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}
