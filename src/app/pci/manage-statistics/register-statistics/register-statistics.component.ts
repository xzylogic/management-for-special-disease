import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { RegisterStatisticsService } from './_service/register-statistics.service';
import { RegisterStatisticsTableService } from './_service/register-statistics-table.service';
import { TableOption, ContainerConfig } from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-register-statistics',
  templateUrl: 'register-statistics.component.html'
})
export class RegisterStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  doctorTable: TableOption;
  @select(['registerStatistics', 'tab']) tab: Observable<number>;
  @select(['registerStatistics', 'page']) page: Observable<Array<number>>;
  userRegisterCount: number;
  doctorRegisterCount: number;
  doctorValidateCount: number;

  constructor(
    @Inject('action') private action,
    private registerStatisticsService: RegisterStatisticsService,
    private registerStatisticsTableService: RegisterStatisticsTableService
  ) {}

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

  reset() {
    this.reset0();
    this.reset1()
  }

  reset0() {
    this.page.subscribe((page: Array<number>) => {
      this.getUsers(page[0]);
      this.getUserCount();
    });
  }

  reset1() {
    this.page.subscribe((page: Array<number>) => {
      this.getDoctors(page[1]);
      this.getDoctorCount();
    });
  }

  getUserCount() {
    this.registerStatisticsService.getUserTotals()
    .subscribe(
      data => {
        if ( data.code === 0 ) {
          this.userRegisterCount = data.data.registerCount;
        }
      }
    )
  }

  getDoctorCount() {
    this.registerStatisticsService.getDoctorTotals()
    .subscribe(
      data => {
        if ( data.code === 0 ) {
          this.doctorRegisterCount = data.data.registerCount;
          this.doctorValidateCount = data.data.validateCount;
        }
      }
    )
  }

  getUsers(page: number) {
    this.action.pageChange('registerStatistics', [page, this.doctorTable.currentPage]);
    this.userTable.reset(page);
    this.registerStatisticsService.getUsers(page, this.userTable.size)
      .subscribe(
        res => {
          this.userTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.userTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.userTable.totalPage = res.data.totalPages;
            this.userTable.lists = res.data.content;
          }else {
            this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userTable.loading = false;
          this.userTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getDoctors(page: number) {
    this.action.pageChange('registerStatistics', [page, this.userTable.currentPage]);
    this.userTable.reset(page);
    this.registerStatisticsService.getDoctors(page, this.doctorTable.size)
      .subscribe(
        res => {
          this.doctorTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.doctorTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.doctorTable.totalPage = res.data.totalPages;
            this.doctorTable.lists = res.data.content;
          }else {
            this.doctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.doctorTable.loading = false;
          this.doctorTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  change(index) {
    this.action.tabChange('registerStatistics', index);
  }
}
