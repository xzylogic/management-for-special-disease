import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { AccountService } from './_service/account.service';
import { AccountTableService } from './_service/account-table.service';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {User} from "../../manage-user/user/_entity/user.entity";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  containerConfig: ContainerConfig;
  accountTable: TableOption;

  count: number;
  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private accountService: AccountService,
    private accountTableService: AccountTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.accountService.accountConfig();
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

  formatList(list) {
    if (typeof list === 'object') {
      list.forEach(obj => {
        console.log(obj.operation);
        // obj.operation = obj.enable ? '禁用' : '启用';
        obj.enable = obj.enable ? '可用' : '禁用';
      });
    }
  }

  gotoHandle(res) {
    const user = <User>res.value;
    if (res.key === 'operation') {
      console.log(res.key);
      // this.action.dataChange('user', user);
      // this.router.navigate(['/user/integral']);
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
            this.formatList(res.data.content);
            console.log(res);
            this.accountTable.totalPage = res.data.totalPages;
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
