import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { UserCertificationService } from './_service/user-certification.service';
import { UserCertificationTableService } from './_service/user-certification-table.service';
import { TableOption, ContainerConfig, ImageDialog } from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-user-certification',
  templateUrl: './user-certification.component.html'
})
export class UserCertificationComponent implements OnInit {

  containerConfig: ContainerConfig;
  userCertificationTable: TableOption;
  userUnCertificationTable: TableOption;
  userCertificatingTable: TableOption;
  userCertificationFailureTable: TableOption;

  @select(['userCertification', 'tab']) tab: Observable<number>;
  @select(['userCertification', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private dialog: MdDialog,
    private userCertificationService: UserCertificationService,
    private userCertificationTableService: UserCertificationTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.userCertificationService.UserCertificationConfig();
    this.userCertificationTable = new TableOption({
      titles: this.userCertificationTableService.setCertificationTitles(),
      ifPage: true
    });
    this.userUnCertificationTable = new TableOption({
      titles: this.userCertificationTableService.setUncertificationTitles(),
      ifPage: true
    });
    this.userCertificatingTable = new TableOption({
      titles: this.userCertificationTableService.setCertificatingTitles(),
      ifPage: true
    });
    this.userCertificationFailureTable = new TableOption({
      titles: this.userCertificationTableService.setCertificationFailureTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
  }

  reset0() {
    this.userCertificationTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserCertifications(page[0]);
    });
  }

  reset1() {
    this.userUnCertificationTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserUncertifications(page[1]);
    });
  }

  reset2() {
    this.userCertificatingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserCertificatings(page[2]);
    });
  }

  reset3() {
    this.userCertificationFailureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserCertificationFailures(page[3]);
    });
  }

  getUserCertifications(page: number) {
    this.action.pageChange('userCertification', [page, this.userUnCertificationTable.currentPage, this.userCertificatingTable.currentPage, this.userCertificationFailureTable.currentPage]);
    this.userCertificationTable.reset(page);
    this.userCertificationService.getUserCertifications(page, this.userCertificationTable.size, this.userCertificationTable.queryKey)
      .subscribe(
        res => {
          this.userCertificationTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userCertificationTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userCertificationTable.totalPage = res.data.totalPages;
            this.userCertificationTable.lists = res.data.content;
          } else {
            this.userCertificationTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          this.userCertificationTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getUserUncertifications(page: number) {
    this.action.pageChange('userCertification', [this.userCertificationTable.currentPage, page, this.userCertificatingTable.currentPage, this.userCertificationFailureTable.currentPage]);
    this.userUnCertificationTable.reset(page);
    this.userCertificationService.getUserUncertifications(page, this.userUnCertificationTable.size, this.userUnCertificationTable.queryKey)
      .subscribe(
        res => {
          this.userUnCertificationTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userUnCertificationTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userUnCertificationTable.totalPage = res.data.totalPages;
            this.userUnCertificationTable.lists = res.data.content;
          } else {
            this.userUnCertificationTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          this.userUnCertificationTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getUserCertificatings(page: number) {
    this.action.pageChange('userCertification', [this.userCertificationTable.currentPage, this.userUnCertificationTable.currentPage, page, this.userCertificationFailureTable.currentPage]);
    this.userCertificatingTable.reset(page);
    this.userCertificationService.getUserCertificatings(page, this.userCertificatingTable.size, this.userCertificatingTable.queryKey)
      .subscribe(
        res => {
          this.userCertificatingTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userCertificatingTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userCertificatingTable.totalPage = res.data.totalPages;
            this.userCertificatingTable.lists = res.data.content;
          } else {
            this.userCertificatingTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          this.userCertificatingTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getUserCertificationFailures(page: number) {
    this.action.pageChange('userCertification', [this.userCertificationTable.currentPage, this.userUnCertificationTable.currentPage, page, this.userCertificatingTable.currentPage]);
    this.userCertificationFailureTable.reset(page);
    this.userCertificationService.getUserCertificationFailures(page, this.userCertificationFailureTable.size, this.userCertificationFailureTable.queryKey)
      .subscribe(
        res => {
          this.userCertificationFailureTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userCertificationFailureTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userCertificationFailureTable.totalPage = res.data.totalPages;
            this.userCertificationFailureTable.lists = res.data.content;
          } else {
            this.userCertificationFailureTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          this.userCertificationFailureTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  // getCertificationCount() {
  //   this._userCertificationService.getCertificationCount()
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.certificatingCount = data.data.auditing;
  //           this.failureCount = data.data.failure;
  //           this._sidebarService.setCount(this.certificatingCount + this.failureCount, 'usergroup', 'usercertification');
  //         }
  //       })
  // }
  //
  gotoHandle(res) {
    if (res.key === 'idCardImageUrl') {
      ImageDialog(res.value.name, res.value.avatarUrl, this.dialog);
    }
  }

  change(index) {
    this.action.tabChange('userCertification', index);
  }
}
