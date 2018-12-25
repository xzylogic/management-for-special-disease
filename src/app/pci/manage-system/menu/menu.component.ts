import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import {select} from "@angular-redux/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @select(['main', 'adminName']) readonly adminName: Observable<string>;
  username: string;
  paramsMenu: string; // menuId
  permission: boolean; // 权限 | true 编辑 false 查看

  subscribeParams: any;
  subscribeData: any;
  subscribeSave: any;
  subscribeDel: any;
  subscribeDialog: any;

  containerConfig: ContainerConfig;
  menuList: any;
  form: any;
  title = '';

  constructor(
    @Inject('auth') private auth,
    @Inject('menu') private menuService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeParams = this.route.params.subscribe(route => {
      if (route.menu) {
        if (this.auth.getMenuPermission().indexOf(route.menu) > -1) {
          this.permission = true;
        }
        console.log(route.menu);
        this.paramsMenu = route.menu;
      }
    });
    this.containerConfig = this.menuService.setMenuConfig();
    this.getMenus();
    this.adminName.subscribe(name => {
      this.username = name;
    });
  }

  ngOnDestroy() {
    if (this.subscribeParams) {
      this.subscribeParams.unsubscribe();
    }
    if (this.subscribeData) {
      this.subscribeData.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
    if (this.subscribeDel) {
      this.subscribeDel.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
  }

  getMenus() {
    this.subscribeData = this.menuService.getMenus()
      .subscribe(res => {
        console.log(res);
        if (res.code === 0 && res.data) {
          this.menuList = res.data;
          this.offData(this.menuList);
        } else {
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
  }

  offData(data) {
    if (data) {
      data.open = false;
      if (data.sysSubMenus && data.sysSubMenus.length !== 0) {
        data.sysSubMenus.forEach(obj => {
          this.offData(obj);
        });
      }
    }
  }

  openData(data) {
    if (data) {
      data.open = true;
      if (data.sysSubMenus && data.sysSubMenus.length !== 0) {
        data.sysSubMenus.forEach(obj => {
          this.openData(obj);
        });
      }
    }
  }

  unActive(data, id) {
    if (data) {
      data.active = data.id === id;
      if (data.sysSubMenus && data.sysSubMenus.length !== 0) {
        data.sysSubMenus.forEach(obj => {
          this.unActive(obj, id);
        });
      }
    }
  }

  toggle(data) {
    data.open = !data.open;
  }

  newMenu(parentId, parentName, level) {
    // if (this.permission) {
    this.unActive(this.menuList, parentId);
    this.form = null;
    this.title = '新增菜单';
    this.form = {parentId: parentId, parentName: parentName, level: level};
    this.cdr.detectChanges();
    // }
  }

  updateMenu(menu) {
    // if (this.permission) {
    this.unActive(this.menuList, 0);
    this.form = null;
    this.title = '编辑菜单';
    // console.log(menu);
    // this.form = this.menuService.setMenuFrom({data: menu});
    console.log(menu);
    this.form = menu;
    this.cdr.detectChanges();
    // }
  }

  deleteMenu(id, menuName) {
    // if (this.permission) {
    this.subscribeDialog = HintDialog(
      `您确定要删除菜单：${menuName}?`,
      this.dialog
    ).afterClosed().subscribe(res => {
      if (res && res.key === 'confirm') {
        this.deleteAction(id);
      }
    });
    // }
  }

  deleteAction(id) {
    this.subscribeDel = this.menuService.deleteMenu(id, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('菜单删除成功！重新登录后可查看菜单变化～', this.dialog);
          this.form = null;
          this.getMenus();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  getValues(value, parentId, id) {
    // value.parentId = parentId;
    // value.delFlag = 0;
    if (id) {
      value.sysMenuId = id;
    }
    console.log(typeof parentId, parentId)
    if(parentId !== '0'){
      value.parentId = parentId;
    }
    console.log(value, parentId, id);
    this.subscribeSave = this.menuService.updateMenu(value, id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('菜单保存成功！重新登录后可查看菜单变化～', this.dialog);
          this.form = null;
          this.getMenus();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}
