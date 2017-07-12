import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { UserCertificationService, UserCertificationTableService } from './_service';
import { SidebarService } from "../../_services/sidebar.service";

@Component({
  selector: 'app-user-certification',
  templateUrl: './user-certification.component.html'
})
export class UserCertificationComponent implements OnInit {
  title = '患者订单管理';
  subTitle = '患者订单列表';

  userCertificationTable: TableOption = new TableOption();
  userUncertificationTable: TableOption = new TableOption();
  userCertificatingTable: TableOption = new TableOption();
  userCertificationFailureTable: TableOption = new TableOption();

  titleShow: string = '提示信息';
  message: string;
  enableShow: boolean;

  certificatingCount: number;
  failureCount: number;

  imgUrls: Array<any>;
  enableImg: boolean;

  constructor(
    private _userCertificationService: UserCertificationService,
    private _userCertificationTableService: UserCertificationTableService,
    private _sidebarService: SidebarService
  ) {
  }

  ngOnInit() {
    this.getUserCertificationTitles();
    this.getUserUncertificationTitles();
    this.getUserCertificatingTitles();
    this.getUserCertificationFailureTitles();
    this.refresh();
  }

  refresh() {
    this.getUserCertifications(0);
    this.getUserUncertifications(0);
    this.getUserCertificatings(0);
    this.getUserCertificationFailures(0);
    this.getCertificationCount();
  }

  getUserCertificationTitles() {
    this.userCertificationTable.titles = this._userCertificationTableService.setCertificationTitles();
  }

  getUserUncertificationTitles() {
    this.userUncertificationTable.titles = this._userCertificationTableService.setUncertificationTitles();
  }

  getUserCertificatingTitles() {
    this.userCertificatingTable.titles = this._userCertificationTableService.setCertificatingTitles();
  }

  getUserCertificationFailureTitles() {
    this.userCertificationFailureTable.titles = this._userCertificationTableService.setCertificationFailureTitles();
  }

  getUserCertifications(page: number) {
    this.userCertificationTable.currentPage = page;
    this._userCertificationService.getUserCertifications(page, this.userCertificationTable.size)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.userCertificationTable.totalPage = data.data.totalPages;
            this.userCertificationTable.lists = data.data.content;
          }
        })
  }

  getUserUncertifications(page: number) {
    this.userUncertificationTable.currentPage = page;
    this._userCertificationService.getUserUncertifications(page, this.userUncertificationTable.size)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.userUncertificationTable.totalPage = data.data.totalPages;
            this.userUncertificationTable.lists = data.data.content;
          }
        })
  }

  getUserCertificatings(page: number) {
    this.userCertificatingTable.currentPage = page;
    this._userCertificationService.getUserCertificatings(page, this.userCertificatingTable.size)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.userCertificatingTable.totalPage = data.data.totalPages;
            this.userCertificatingTable.lists = data.data.content;
          }
        })
  }

  getUserCertificationFailures(page: number) {
    this.userCertificationFailureTable.currentPage = page;
    this._userCertificationService.getUserCertificationFailures(page, this.userCertificationFailureTable.size)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.userCertificationFailureTable.totalPage = data.data.totalPages;
            this.userCertificationFailureTable.lists = data.data.content;
          }
        })
  }

  getCertificationCount() {
    this._userCertificationService.getCertificationCount()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.certificatingCount = data.data.auditing;
            this.failureCount = data.data.failure;
            this._sidebarService.setCount(this.certificatingCount + this.failureCount, 'usergroup', 'usercertification');
          }
        })
  }

  gotoHandle(data) {
    if (data.key === 'idCardImageUrl') {
      this.imgUrls = [];
      this.imgUrls.push(data.value[data.key]);
      this.enableImg = true;
    }
  }

}
