import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { RegisterStatisticsService } from './_service/register-statistics.service';
import { RegisterStatisticsTableService } from './_service/register-statistics-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-register-statistics',
  templateUrl: 'register-statistics.component.html'
})
export class RegisterStatisticsComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  doctorTable: TableOption;

  subscribeUserTable: any;
  subscribeDoctorTable: any;

  userRegisterCount: number | string;
  doctorRegisterCount: number | string;
  doctorValidateCount: number | string;

  constructor(
    private registerStatisticsService: RegisterStatisticsService,
    private registerStatisticsTableService: RegisterStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.registerStatisticsService.registerStatisticsConfig();
    this.userTable = new TableOption({
      titles: this.registerStatisticsTableService.setUserTitles(),
      ifPage: true
    });
    this.doctorTable = new TableOption({
      titles: this.registerStatisticsTableService.setDoctorTitles(),
      ifPage: true
    });
    this.reset();
  }

  ngOnDestroy() {
    if (this.subscribeUserTable) {
      this.subscribeUserTable.unsubscribe();
    }
    if (this.subscribeDoctorTable) {
      this.subscribeDoctorTable.unsubscribe();
    }
  }

  reset() {
    this.reset0();
    this.reset1()
  }

  reset0() {
    this.getUsers(0);
    this.getUserCount();
  }

  reset1() {
    this.getDoctors(0);
    this.getDoctorCount();
  }

  getUserCount() {
    let count = this.registerStatisticsService.getUserTotals()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.userRegisterCount = data.data.registerCount;
            count.unsubscribe();
          } else {
            this.userRegisterCount = '未找到数据';
            count.unsubscribe();
          }
        }, err => {
          this.userRegisterCount = '网络出错';
          count.unsubscribe();
          return new Error(err);
        }
      )
  }

  getDoctorCount() {
    let count = this.registerStatisticsService.getDoctorTotals()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.doctorRegisterCount = data.data.registerCount;
            this.doctorValidateCount = data.data.validateCount;
            count.unsubscribe();
          } else {
            this.doctorRegisterCount = '未找到数据';
            this.doctorValidateCount = '未找到数据';
            count.unsubscribe();
          }
        }, err => {
          this.doctorRegisterCount = '网络出错';
          this.doctorValidateCount = '网络出错';
          count.unsubscribe();
          return new Error(err);
        }
      )
  }

  getUsers(page: number) {
    this.userTable.reset(page);
    this.subscribeUserTable = this.registerStatisticsService.getUsers(page, this.userTable.size)
      .subscribe(
        res => {
          this.userTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.userTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.userTable.totalPage = res.data.totalPages;
            this.userTable.lists = res.data.content;
          } else {
            this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userTable.loading = false;
          console.log(err);
          this.userTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getDoctors(page: number) {
    this.userTable.reset(page);
    this.subscribeDoctorTable = this.registerStatisticsService.getDoctors(page, this.doctorTable.size)
      .subscribe(
        res => {
          this.doctorTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.doctorTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.doctorTable.totalPage = res.data.totalPages;
            this.doctorTable.lists = res.data.content;
          } else {
            this.doctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.doctorTable.loading = false;
          console.log(err);
          this.doctorTable.errorMessage = ERRMSG.netErrMsg;
        })
  }
}
