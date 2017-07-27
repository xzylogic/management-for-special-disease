import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ActivenessStatisticsService } from './_service/activeness-statistics.service';
import { ActivenessStatisticsTableService } from './_service/activeness-statistics-table.service';
import {
  TableOption, ContainerConfig
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-activeness-statistics',
  templateUrl: 'activeness-statistics.component.html'
})
export class ActivenessStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  userActivenessTable: TableOption;
  doctorActivenessTable: TableOption;
  @select(['activenessStatistics', 'tab']) tab: Observable<number>;
  @select(['activenessStatistics', 'page']) page: Observable<Array<number>>;
  // title = '数据统计';
  // subTitle = '日活跃度统计';
  //
  // userActivenessTable: TableOption;
  // doctorActivenessTable: TableOption;
  //
  userStatistics: any;
  doctorStatistics: any;
  //
  // queryUserKey: string;
  queryUserDate: any;
  // queryDoctorKey: string;
  queryDoctorDate: any;

  constructor(
    @Inject('action') private action,
    private activenessStatisticsService: ActivenessStatisticsService,
    private activenessStatisticsTableService: ActivenessStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.activenessStatisticsService.activenessConfig();
    this.userActivenessTable = new TableOption({
      titles: this.activenessStatisticsTableService.setUserTitles(),
      ifPage: true
    });
    this.doctorActivenessTable = new TableOption({
      titles: this.activenessStatisticsTableService.setDoctorTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    let date = new Date();
    let Y = date.getFullYear().toString();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    this.queryUserDate = `${Y}-${M}-${D}`;
    this.queryDoctorDate = `${Y}-${M}-${D}`;
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.userActivenessTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserActivenessStatistics(page[0]);
    });
  }

  reset1() {
    this.doctorActivenessTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getDoctorActivenessStatistics(page[1]);
    });
  }


  // resetUser() {
  //   this.queryUserKey = null;
  //   this.queryUserDate = null;
  //   this.getUserActivenessStatistics(0);
  // }
  // //时间选择
  // date(){
  //   $("#patient").flatpickr({
  //     "locale": "zh",
  //   });
  //   $("#doctor").flatpickr({
  //     "locale": "zh",
  //   });
  // }
  //
  // resetDoctor() {
  //   this.queryDoctorKey = null;
  //   this.queryDoctorDate = null;
  //   this.getDoctorActivenessStatistics(0);
  // }
  //
  // getUserActivenessTitles() {
  //   this.userActivenessTable.titles = this._activenessStatisticsTableService.setUserTitles();
  // }
  //
  // getDoctorActivenessTitles() {
  //   this.doctorActivenessTable.titles = this._activenessStatisticsTableService.setDoctorTitles();
  // }
  //
  getUserActivenessStatistics(page: number) {
    this.action.pageChange('activenessStatistics', [page, this.doctorActivenessTable.currentPage]);
    this.userActivenessTable.reset(page);
    const option: any = { page: page, size: this.userActivenessTable.size };
    if (this.userActivenessTable.queryKey) {
      option.key = this.userActivenessTable.queryKey;
    }
    if (this.queryUserDate) {
      option.date = this.queryUserDate;
    }
    this.activenessStatisticsService.getUserActiveness(option)
      .subscribe(
        res => {
          this.userActivenessTable.loading = false;
          if (res.data && res.data.list && res.data.list.content && res.data.list.content.length === 0 && res.code === 0) {
            this.userActivenessTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.list && res.data.list.content && res.code === 0) {
            this.userActivenessTable.totalPage = res.data.list.totalPages;
            this.userActivenessTable.lists = res.data.list.content;
            if (res.data.statistics) {
              this.userStatistics = {};
              this.userStatistics.loginTotal = res.data.statistics.loginTotal;
              this.userStatistics.loginCount = res.data.statistics.loginCount;
              this.userStatistics.loginRate = res.data.statistics.loginRate;
              this.userStatistics.loginAverage = res.data.statistics.loginAverage;
            }
          } else {
            this.userActivenessTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.userActivenessTable.loading = false;
          this.userActivenessTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getDoctorActivenessStatistics(page: number) {
    this.action.pageChange('activenessStatistics', [this.userActivenessTable.currentPage, page]);
    this.doctorActivenessTable.reset(page);
    const option: any = { page: page, size: this.doctorActivenessTable.size };
    if (this.doctorActivenessTable.queryKey) {
      option.key = this.doctorActivenessTable.queryKey;
    }
    if (this.queryDoctorDate) {
      option.date = this.queryDoctorDate;
    }
    this.activenessStatisticsService.getDoctorActiveness(option)
      .subscribe(
        res => {
          this.doctorActivenessTable.loading = false;
          if (res.data && res.data.list && res.data.list.content && res.data.list.content.length === 0 && res.code === 0) {
            this.doctorActivenessTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.list && res.data.list.content && res.code === 0) {
            this.doctorActivenessTable.totalPage = res.data.list.totalPages;
            this.doctorActivenessTable.lists = res.data.list.content;
            if (res.data.statistics) {
              this.doctorStatistics = {};
              this.doctorStatistics.loginTotal = res.data.statistics.loginTotal;
              this.doctorStatistics.loginCount = res.data.statistics.loginCount;
              this.doctorStatistics.loginRate = res.data.statistics.loginRate;
              this.doctorStatistics.loginAverage = res.data.statistics.loginAverage;
            }
          } else {
            this.doctorActivenessTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.doctorActivenessTable.loading = false;
          this.doctorActivenessTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  change(index) {
    this.action.tabChange('activenessStatistics', index);
  }
}
