import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { BusinessStatisticsService } from './_service/business-statistics.service';
import { BusinessStatisticsTableService } from './_service/business-statistics-table.service';
import {
  TableOption, ContainerConfig
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-business-statistics',
  templateUrl: 'business-statistics.component.html'
})
export class BusinessStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  businessUserTable: TableOption;
  businessDoctorTable: TableOption;
  @select(['businessStatistics', 'tab']) tab: Observable<number>;
  // title = '数据统计';
  // subTitle = '业务数据统计';
  //
  // userTable: TableOption = new TableOption;
  // doctorTable: TableOption = new TableOption;
  //
   queryUserDate: any;
   queryDoctorDate: any;

  constructor(
    @Inject('action') private action,
    private businessservice: BusinessStatisticsService,
    private businesstableService: BusinessStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.businessservice.businessConfig();
    this.businessUserTable = new TableOption({
      titles: this.businesstableService.setTitles(),
      ifPage: true
    });
    this.businessDoctorTable = new TableOption({
      titles: this.businesstableService.setTitles(),
      ifPage: true
    });
    this.defaultData();
    // this.defaultData();
    // this.date();
    // this.getTitles();
    // this.userExcel();
    // this.doctorExcel();
  }

  // 分解faltpickr形成的日期范围字符串并调用接口更新数据
  clickUserSearch(queryDate) {
    let date: string[] = (<string>queryDate).split(/[ ]/);
    var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
    var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
    this.getUserData(start, end);
  }

  clickDoctorSearch(queryDate) {
    let date: string[] = (<string>queryDate).split(/[ ]/);
    var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
    var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
    this.getDoctorData(start, end);
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
    this.getUserData(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
    this.getDoctorData(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
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

  getUserData(start, end) {
    let option: any = { startTime: start, endTime: end};
    this.businessservice.getData(option)
      .subscribe(
        data => {
          this.businessUserTable.loading = false;
          if (data.data && data.code === 0) {
            this.businessUserTable.lists = data.data.userData;
          } else {
            this.businessUserTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.businessUserTable.loading = false;
          this.businessUserTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getDoctorData(start, end) {
    let option: any = { startTime: start, endTime: end};
    this.businessservice.getData(option)
      .subscribe(
        data => {
          this.businessDoctorTable.loading = false;
          if (data.data && data.code === 0) {
            this.businessDoctorTable.lists = data.data.doctorData;
          } else {
            this.businessDoctorTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.businessDoctorTable.loading = false;
          this.businessDoctorTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  change(index) {
    this.action.tabChange('businessStatistics', index);
  }

  // userExcel(){
  //   $('.userExcel').on('click', function(){
  //       let myDate = new Date();
  //       let $this = $(this);
  //       let table = $("#userExcel")[0];
  //       $this.attr('download', '肾移植管家业务数据统计-患者端-'+myDate.toLocaleDateString()+'.xls');
  //       ExcellentExport.excel(this, table);
  //   });
  // }
  //
  // doctorExcel(){
  //   $('.doctorExcel').on('click', function(){
  //       let myDate = new Date();
  //       let $this = $(this);
  //       let table = $("#doctorExcel")[0];
  //       $this.attr('download', '肾移植管家业务数据统计-医生端-'+myDate.toLocaleDateString()+'.xls');
  //       ExcellentExport.excel(this, table);
  //   });
  // }
}
