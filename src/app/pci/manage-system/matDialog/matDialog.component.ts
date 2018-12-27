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
  // @ViewChild('all') all: any;
  // @ViewChild('checked0') checked0: any;
  // @ViewChild('checked1') checked1: any;
  // @ViewChild('checked2') checked2: any;
  // @ViewChild('checked3') checked3: any;
  // @ViewChild('checked4') checked4: any;
  // @ViewChild('checked5') checked5: any;
  // @ViewChild('checked6') checked6: any;
  //
  // showMat:boolean = false;
  // userInfo: any;
  // angle = 0;
  // _checked0:boolean = this.checked0.checked;
  // _checked1:boolean = this.checked1.checked;
  // _checked2:boolean = this.checked2.checked;
  // _checked3:boolean = this.checked3.checked;
  // _checked4:boolean = this.checked4.checked;
  // _checked5:boolean = this.checked5.checked;
  // _checked6:boolean = this.checked6.checked;
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

    // if(this.data && this.data.id){
    //   this.showMat = false;
    //   this.viewPhotos(this.data.id);
    // }
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




















  // rotate() {
  //   this.angle += 90;
  // }
  //
  // getImageSize() {
  //   return `rotate(${this.angle}deg)`;
  // }

  viewPhotos(id){
    console.log(id)
    // this.dataCollectionService.getDataCollection(id)
    //   .subscribe(res => {
    //     this.userInfo = res.data;
    //   })
  }

  // _allCheck(){
  //   if(this.checked6.checked){
  //     this.checked0.checked = true;
  //     this.checked1.checked = true;
  //     this.checked2.checked = true;
  //     this.checked3.checked = true;
  //     this.checked4.checked = true;
  //     this.checked5.checked = true;
  //     this.checked6.checked = true;
  //   }else{
  //     this.checked0.checked = false;
  //     this.checked1.checked = false;
  //     this.checked2.checked = false;
  //     this.checked3.checked = false;
  //     this.checked4.checked = false;
  //     this.checked5.checked = false;
  //     this.checked6.checked = false;
  //   }
  // }
  //
  // _Check(){
  //   if(this.checked0.checked == true && this.checked1.checked == true && this.checked2.checked == true && this.checked3.checked == true &&
  //     this.checked4.checked == true && this.checked5.checked == true){
  //     return this.checked6.checked = true;
  //   }
  //   return this.checked6.checked = false;
  // }

  // getExportFile(){
  //   let Export = (checked:boolean,status:any) => {
  //     if(checked){
  //       this.dataCollectionService.exportFiles(status)
  //         .subscribe(res => {
  //           if (res && res.code === 0) {
  //             const a = document.createElement('a');
  //             document.body.appendChild(a);
  //             a.setAttribute('style', 'display:none');
  //             a.setAttribute('href', res.data);
  //             a.click();
  //           } else {
  //             HintDialog(res.msg || '啊哦～访问接口出错啦～！', this.dialog);
  //           }
  //         }, err => {
  //           HintDialog('啊哦～访问接口出错啦～', this.dialog);
  //           throw new Error(err);
  //         })
  //     }
  //     return null;
  //   };
  //   if(this.checked6.checked === false){
  //     Export(this.checked0.checked,5);
  //     Export(this.checked1.checked,0);
  //     Export(this.checked2.checked,1);
  //     Export(this.checked3.checked,3);
  //     Export(this.checked4.checked,2);
  //     Export(this.checked5.checked,4);
  //   }else{
  //     Export(this.checked6.checked,null);
  //   }
  // }

}