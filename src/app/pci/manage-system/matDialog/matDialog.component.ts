import {Component, ViewChild, Inject, OnInit, OnDestroy} from "@angular/core";
// import { DataCollectionService } from '../_service/data-collection.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../role/role.component'
// import { Account_DialogData } from '../account/account.component'
import {HintDialog} from "../../../libs/dmodal/dialog.component";
import { Observable } from 'rxjs/Observable';
import { ERRMSG } from '../../_store/static';
import {select} from "@angular-redux/store";
import {ContainerConfig} from "../../../libs/common/container/container.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'role-config-matDialog',
  styleUrls: ['./matDialog.component.css'],
  templateUrl: './matDialog.component.html',
})
export class MatDialogComponent implements OnInit, OnDestroy  {
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
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // @Inject(MAT_DIALOG_DATA) public accountData: Account_DialogData,
    // private dataCollectionService: DataCollectionService,
    @Inject('role') private roleService,
    // @Inject('account') private accountService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ){

  }

  ngOnInit(){
    // console.log(this.accountData)
    // console.log(this.data)
    if(this.data && this.data.id){
      this.subscribeRoute = Observable.zip(
        this.route.params, this.route.queryParams,
        this.roleService.getMenus(),
        (route, query, menu): any => ({route, query:{id: null}, menu})
      ).subscribe(res => {
        res.query.id = this.data.id;
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
    this.subscribeDetail = this.roleService.getRoleMenu(id)
      .subscribe(res => {
        // console.log(res);
        if (res.code === 0 && res.data) {
          this.form = this.roleService.setRoleTreeForm(res.data);
        } else {
          HintDialog('初始化数据失败，请刷新重试！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('初始化数据失败，请刷新重试！', this.dialog);
      });
  }

  getValue(data) {
    if (Array.isArray(data.menuIds)) {
      data.menuIds = data.menuIds.splice(1);
    }
    this.subscribeSave = this.roleService.addRoleMenu(data, this.paramsMenu)
      .subscribe(res => {
        if (res.code === 0) {
          this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog)
            .afterClosed().subscribe(() => {
              this.dialogRef.close();
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