import { Component, OnInit, Inject} from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { DownloadStatisticsService } from './_service/download-statistics.service';
import { DownloadStatisticsTableService } from './_service/download-statistics-table.service';import {
  TableOption, ContainerConfig
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-download-statistics',
  templateUrl: 'download-statistics.component.html'
})
export class DownloadStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  mainTable: TableOption;
  userTable: TableOption;
  doctorTable: TableOption;
  @select(['downloadStatistics', 'tab']) tab: Observable<number>;
  // title = '渠道来源统计';
  // subTitle = '渠道来源统计列表';
  //
  // mainTable: TableOption = new TableOption;
  // userTable: TableOption = new TableOption;
  // doctorTable: TableOption = new TableOption;
  //
   queryMainDate: any;
   queryUserDate: any;
   queryDoctorDate: any;

  constructor(
    @Inject('action') private action,
    private service: DownloadStatisticsService,
    private tableService: DownloadStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.service.downloadConfig();
    this.mainTable = new TableOption({
      titles: this.tableService.setMainTitles(),
      ifPage: true
    });
    this.userTable = new TableOption({
      titles: this.tableService.setTitles(),
      ifPage: true
    });
    this.doctorTable = new TableOption({
      titles: this.tableService.setTitles(),
      ifPage: true
    });
    this.defaultData();
    // this.defaultData();
    // this.initFlatpickr();
    // this.mainTable.titles = this._tableService.setMainTitles();
    // this.userTable.titles = this._tableService.setTitles();
    // this.doctorTable.titles = this._tableService.setTitles();
  }

  // 分解faltpickr形成的日期范围字符串并调用接口更新数据
  clickUserSearch(queryDate) {
    let date: string[] = (<string>queryDate).split(/[ ]/);
    var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
    var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
    // this.getUserData(start, end);
  }

  clickDoctorSearch(queryDate) {
    let date: string[] = (<string>queryDate).split(/[ ]/);
    var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
    var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
    // this.getDoctorData(start, end);
  }

  // 计算当前时间前一周作为默认时间段调用接口并更新数据
  defaultData() {
    // 计算今天前一天日期
    let date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    let oneDayBeforeToday = this.toDateString(date1);
    let oneDayBeforeTodayValue = this.toDateValue(date1, 24, 0, 0);

    // 计算今天前第七天日期
    let date2 = new Date();
    date2.setDate(date2.getDate() - 7);
    let sevenDaysBeforeToday = this.toDateString(date2);
    let sevenDaysBeforeTodayValue = this.toDateValue(date2, 0, 0, 0);

    // 设置日期框默认日期
    this.queryUserDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
    this.queryDoctorDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;

    // 调用接口更新默认数据，默认今天前第七天到今天前一天
    this.getMainQueryResult(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
    this.getUserQueryResult(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
    this.getDoctorQueryResult(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
  }

  toDateString(date) {
    let Y = date.getFullYear().toString();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    return `${Y}-${M}-${D}`;
  }

  toDateValue(date, h, m, s) {
    let Y = date.getFullYear();
    let M = date.getMonth();
    let D = date.getDate();
    return new Date(Y, M, D, h, m, s).valueOf();
  }

  getMainQueryResult(start, end) {
    this.mainTable.loading = true;
    this.mainTable.lists = null;
    this.service.getDownloadStatistics(start, end, 2)
      .subscribe(data => {
        this.mainTable.loading = false;
        if (data.data && data.code === 0) {
          this.mainTable.lists = data.data;
        } else {
          this.mainTable.errorMessage = data.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.mainTable.loading = false;
        this.mainTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getUserQueryResult(start, end) {
    this.userTable.loading = true;
    this.userTable.lists = null;
    this.service.getDownloadStatistics(start, end, 0)
      .subscribe(data => {
        this.userTable.loading = false;
        if (data.data && data.code === 0) {
          this.userTable.lists = data.data;
          this.format(this.userTable.lists);
        } else {
          this.userTable.errorMessage = data.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.userTable.loading = false;
        this.userTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getDoctorQueryResult(start, end) {
    this.doctorTable.loading = true;
    this.doctorTable.lists = null;
    this.service.getDownloadStatistics(start, end, 1)
      .subscribe(data => {
        this.doctorTable.loading = false;
        if (data.data && data.code === 0) {
          this.doctorTable.lists = data.data;
          this.format(this.doctorTable.lists);
        } else {
          this.doctorTable.errorMessage = data.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorTable.loading = false;
        this.doctorTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  format(data) {
    if (typeof data === 'object') {
      data.forEach(obj => {
        obj.ios = `${obj.ios}/${obj.ios_u}`;
        obj.android = `${obj.android}/${obj.android_u}`;
      })
    }
  }

  change(index) {
    this.action.tabChange('downloadStatistics', index);
  }
}
