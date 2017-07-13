import { Component, OnInit } from '@angular/core';
import { CustomMenuService } from './_service/custom-menu.service';
import { CustomMenuTableService } from './_service/custom-menu-table.service';

@Component({
  selector: 'app-custom-menu',
  templateUrl: 'custom-menu.component.html'
})
export class CustomMenuComponent implements OnInit {
  // title = '菜单管理';
  // subTitle = '一级菜单列表';
  // subMenu: string;
  //
  // customMenuTable: TableOption = new TableOption();
  // customSubMenuTable: TableOption;
  //
  // customMenu: any;
  // status: number;
  //
  // enableEdit: boolean;
  // enableDel: boolean;
  // enablePush: boolean;
  //
  // titleShow: string;
  // message: string;
  // enableShow: boolean;

  constructor(
    private _customMenuService: CustomMenuService,
    private _customMenuTableService: CustomMenuTableService
  ) {
  }

  ngOnInit() {
    // this.getCustomMenuTitles();
    // this.getLocalMenus();
  }

  // getCustomMenuTitles() {
  //   this.customMenuTable.titles = this._customMenuTableService.setTitles();
  // }
  //
  // getCustomSubMenuTitles() {
  //   this.customSubMenuTable.titles = this._customMenuTableService.setSubTitles();
  // }
  //
  // getLocalMenus() {
  //   this.hideSubMenu();
  //   this.customMenuTable.loading = true;
  //   this.customMenuTable.lists = null;
  //   this._customMenuService.getMenuLocal()
  //     .subscribe(
  //       data => {
  //         this.customMenuTable.loading = false;
  //         if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.customMenuTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.customMenuTable.lists = data.data.button;
  //           this.formatMenu(this.customMenuTable.lists);
  //         } else {
  //           this.customMenuTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.customMenuTable.loading = false;
  //         this.customMenuTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getRemoteMenus() {
  //   this.hideSubMenu();
  //   this.customMenuTable.loading = true;
  //   this.customMenuTable.lists = null;
  //   this._customMenuService.getMenuRemote()
  //     .subscribe(
  //       data => {
  //         this.customMenuTable.loading = false;
  //         if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.customMenuTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.customMenuTable.lists = data.data.button;
  //           this.formatMenu(this.customMenuTable.lists);
  //         } else {
  //           this.customMenuTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.customMenuTable.loading = false;
  //         this.customMenuTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // gotoHandle(data) {
  //   this.subMenu = `二级菜单列表 - ${data.value.name}`;
  //   if (data.key === 'subMenu' && data.value.sub_button) {
  //     this.customSubMenuTable = new TableOption();
  //     this.customSubMenuTable.queryKey = data.value.id;
  //     this.getCustomSubMenuTitles();
  //     this.customSubMenuTable.lists = data.value.sub_button;
  //   } else if (data.key === 'subMenu' && !data.value.sub_button) {
  //     this.customSubMenuTable = new TableOption();
  //     this.customSubMenuTable.queryKey = data.value.id;
  //     this.getCustomSubMenuTitles();
  //     this.customSubMenuTable.errorMessage = '该项没有子菜单哦～';
  //   } else if (data.key === 'edit') {
  //     this.status = 1;
  //     this.customMenu = data.value;
  //     this.enableEdit = true;
  //   } else if (data.key === 'editSub') {
  //     this.status = 2;
  //     this.customMenu = data.value;
  //     this.enableEdit = true;
  //   } else if (data.key === 'del') {
  //     this.customMenu = data.value;
  //     this.enableDel = true;
  //   }
  // }
  //
  // newMenu() {
  //   this.customMenu = null;
  //   this.status = 0;
  //   this.enableEdit = true;
  // }
  //
  // newSubMenu(id) {
  //   this.customMenu = null;
  //   this.status = id;
  //   this.enableEdit = true;
  // }
  //
  // hideSubMenu() {
  //   this.customSubMenuTable = null;
  // }
  //
  // handleSuccess(data) {
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.getLocalMenus();
  // }
  //
  // menuDel() {
  //   if (this.customMenu) {
  //     this._customMenuService.menuDel(this.customMenu.id)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.titleShow = '提示信息';
  //             this.message = '删除菜单成功！';
  //             this.enableShow = true;
  //             this.delCancel();
  //             this.getLocalMenus();
  //           } else {
  //             if (data.msg) {
  //               this.message = data.msg;
  //             } else {
  //               this.message = '删除菜单失败！';
  //             }
  //             this.titleShow = '提示信息';
  //             this.enableShow = true;
  //             this.delCancel();
  //           }
  //         }, err => {
  //           this.message = '删除菜单失败！';
  //           this.titleShow = '提示信息';
  //           this.enableShow = true;
  //           this.delCancel();
  //         })
  //   }
  // }
  //
  // delCancel() {
  //   this.customMenu = '';
  //   this.enableDel = false;
  // }
  //
  // gotoPush() {
  //   this.enablePush = true;
  // }
  //
  // pushCancel() {
  //   this.enablePush = false;
  // }
  //
  // pushToRemote() {
  //   this._customMenuService.menuPush()
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.titleShow = '提示信息';
  //           this.message = '发布到远程成功！';
  //           this.enableShow = true;
  //           this.pushCancel();
  //         } else {
  //           if (data.msg) {
  //             this.message = data.msg;
  //           } else {
  //             this.message = '发布到远程失败！';
  //           }
  //           this.titleShow = '提示信息';
  //           this.enableShow = true;
  //           this.pushCancel();
  //         }
  //       }, err => {
  //         this.message = '发布到远程失败！';
  //         this.titleShow = '提示信息';
  //         this.enableShow = true;
  //         this.pushCancel();
  //       })
  // }
  //
  // formatMenu(data) {
  //   data.forEach(obj => {
  //     if (obj.sub_button) {
  //       obj.sub_button.forEach(subObj => {
  //         subObj.parentId = obj.id;
  //         subObj.parentName = obj.name;
  //       })
  //     }
  //   })
  // }
}
