import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { AccountService } from './_service/account.service';
import { AccountTableService } from './_service/account-table.service';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

import { saveAs } from 'file-saver';
import {ActivatedRoute, Router} from "@angular/router";
// import {MatDialogComponent} from "../matDialog/matDialog.component";

// export interface Account_DialogData {
//   accountId: any;
// }

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  account_Config: ContainerConfig;
  accountTable: TableOption;

  accountId: any;
  subscribeHDialog: any;
  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private accountService: AccountService,
    private accountTableService: AccountTableService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.account_Config = this.accountService.accountConfig();
    this.accountTable = new TableOption({
      titles: this.accountTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.accountTable.queryKey = '';
    this.getsystemAccount(0);
  }

  getStatus(list) {
    // if (typeof list === 'object') {
    list.forEach(obj => {
      obj.enableRole = obj.enableRole ? '可用' : '禁用';
    });
    // }
  }

  gotoHandle(res) {
    const id = res.value.id;
    console.log(res);
    // this.subscribeHDialog = HintDialog(
    //   `你确定要 ${res.value.enable === '可用' ? '禁用' : '启用'} 吗？`,
    //   this.dialog
    // ).afterClosed().subscribe(result => {
    //   if (result && result.key === 'confirm') {
    //     this.accountService.enableAccount(id).subscribe(res => {
    //       if (res.code === 0) {
    //         this.getsystemAccount(0);
    //         HintDialog(res.msg || '操作成功！', this.dialog);
    //       } else {
    //         HintDialog(res.msg || '操作失败～', this.dialog);
    //       }
    //     }, err => {
    //       console.log(err);
    //       HintDialog(ERRMSG.netErrMsg, this.dialog);
    //     });
    //   }
    // });
    if (res.key === 'config' && res.value) {
      this.router.navigate(['/account', 'config'], {queryParams: {id: id}});
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
  }

  getsystemAccount(page: number) {
    this.accountTable.reset(page);
    // console.log(page, this.accountTable.size, this.accountTable.queryKey)
    this.accountService.getData(page, this.accountTable.size, this.accountTable.queryKey)
      .subscribe(
        res => {
          this.accountTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.accountTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.accountTable.totalPage = res.data.totalPages;
            this.getStatus(res.data.content);
            this.accountTable.lists = res.data.content;
          } else {
            this.accountTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.accountTable.loading = false;
          console.log(err);
          this.accountTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  enableMenu(id, flag) {
    this.accountService.enableAccount(id).subscribe(res => {
      if (res.code === 0) {
        this.getsystemAccount(0);
        HintDialog(res.msg || '操作成功！', this.dialog);
      } else {
        HintDialog(res.msg || '操作失败～', this.dialog);
      }
    }, err => {
      console.log(err);
      HintDialog(ERRMSG.netErrMsg, this.dialog);
    });
  }
  // export() {
  //   let exportList;
  //   this.accountService.getData(0, 99999, this.accountTable.queryKey)
  //     .subscribe(res => {
  //       if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
  //         exportList = this.common.toArray(res.data.content);
  //         /* generate worksheet */
  //         const ws = XLSX.utils.aoa_to_sheet(exportList);
  //         /* generate workbook and add the worksheet */
  //         const wb = XLSX.utils.book_new();
  //         XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
  //         /* save to file */
  //         const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
  //         const fileName = `病例统计列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
  //         saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
  //       } else {
  //         HintDialog('导出数据错误，请重新尝试', this.dialog);
  //       }
  //     }, err => {
  //       console.log(err);
  //       HintDialog('导出数据错误，请重新尝试', this.dialog);
  //     });
  // }
}
