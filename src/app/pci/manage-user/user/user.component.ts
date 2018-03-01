import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { UserService } from './_service/user.service';
import { UserTableService } from './_service/user-table.service';
import { User } from './_entity/user.entity';
import { ERRMSG, AOA } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  queryBind: any;
  RegisterDate: any;
  @select(['user', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('common') private common,
    @Inject('search') private search,
    private userService: UserService,
    private userTableService: UserTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('user', new User());
  }

  ngOnInit() {
    this.containerConfig = this.userService.userConfig();
    this.userTable = new TableOption({
      titles: this.userTableService.setUserTitles(),
      ifPage: true
    });
    // this.RegisterDate = this.search.setDefaultRange();
    this.reset();
  }

  reset() {
    this.userTable.queryKey = '';
    this.queryBind = '';
    this.RegisterDate = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUsers(page[0]);
    });
  }

  getUsers(page: number) {
    // const option = this.search.getStartAndEnd(this.RegisterDate);
    this.action.pageChange('user', [page]);
    this.userTable.reset(page);
    this.userService.getUsers(
      this.userTable.queryKey, this.queryBind, this.RegisterDate, page, this.userTable.size)
      .subscribe(res => {
        this.userTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.userTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.userTable.totalPage = res.data.totalPages;
          // this.userTable.totalElements = data.data.totalElements;
          this.formatUser(res.data.content);
          this.userTable.lists = res.data.content;
        } else {
          this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.userTable.loading = false;
        this.userTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  // 转换
  formatUser(list: Array<any>) {
    list.forEach(data => {
      // data.hospitalId = data.hospital && data.hospital.id || '';
      // data.hospitalName = data.hospital && data.hospital.name || '';
      if (data.sex === 0) {
        data.sexName = '男';
      }
      if (data.sex === 1) {
        data.sexName = '女';
      }
    })
  }

  newData() {
    this.action.dataChange('user', new User());
    this.router.navigate(['/user/edit']);
  }

  toSendMessage() {
    this.router.navigate(['/user/message']);
  }

  gotoHandle(res) {
    const user = <User>res.value;
    if (res.key === 'integral') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/integral']);
    }
    if (res.key === 'edit') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/edit']);
    }
  }

  export() {
    let exportList;
    this.userService.getUsers(this.userTable.queryKey, this.queryBind, '2', 0, 99999)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
          exportList = this.common.toArray(res.data.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `全程心管家患者信息列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
          saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }
}
