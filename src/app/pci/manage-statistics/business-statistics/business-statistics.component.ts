import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import {
  BusinessStatisticsService,
  BusinessStatisticsTableService
} from './_service';

declare var $: any;
declare var flatpickr: any;
declare var ExcellentExport:any;

@Component({
  selector: 'business-statistics',
  templateUrl: 'business-statistics.component.html'
})
export class BusinessStatisticsComponent implements OnInit {
  title = '数据统计';
  subTitle = '业务数据统计';

  userTable: TableOption = new TableOption;
  doctorTable: TableOption = new TableOption;

  queryUserDate: any;
  queryDoctorDate: any;

  constructor(
    private _service: BusinessStatisticsService,
    private _tableService: BusinessStatisticsTableService
  ) {}

  ngOnInit() {
    this.defaultData();
    this.date();
    this.getTitles();
    this.userExcel();
    this.doctorExcel();
  }

  //时间选择
  date(){
    $("#user").flatpickr({
      "mode": "range",
    });
    $("#doctor").flatpickr({
      "mode": "range",
    });
  }

  getTitles() {
    this.userTable.titles = this._tableService.setTitles();
    this.doctorTable.titles = this._tableService.setTitles();
  }

  //计算当前时间前一周作为默认时间段调用接口并更新数据
  defaultData() {
    //计算今天前一天日期
    let date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    let oneDayBeforeToday = this.toDateString(date1);
    let oneDayBeforeTodayValue = this.toDateValue(date1, 24, 0, 0);

    //计算今天前第七天日期
    let date2 = new Date();
    date2.setDate(date2.getDate()-7);
    let sevenDaysBeforeToday = this.toDateString(date2);
    let sevenDaysBeforeTodayValue = this.toDateValue(date2, 0, 0, 0);

    //设置日期框默认日期
    this.queryUserDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
    this.queryDoctorDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;

    //调用接口更新默认数据，默认今天前第七天到今天前一天
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
  
  //分解faltpickr形成的日期范围字符串并调用接口更新数据
  clickUserSearch(){
    let date: string[] = (<string>this.queryUserDate).split(/[ ]/);
    var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
    var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
    this.getUserData(start, end);
  }

  clickDoctorSearch(){
    let date: string[] = (<string>this.queryDoctorDate).split(/[ ]/);
    var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
    var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
    this.getDoctorData(start, end);
  }

  getUserData(start, end) {
    let option: any = { startTime: start, endTime: end};
    this._service.getData(option)
      .subscribe(
        data => {
          this.userTable.loading = false;
          if (data.data && data.code === 0) {
            this.userTable.lists = data.data.userData;
          } else {
            this.userTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.userTable.loading = false;
          this.userTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getDoctorData(start, end) {
    let option: any = { startTime: start, endTime: end};
    this._service.getData(option)
      .subscribe(
        data => {
          this.doctorTable.loading = false;
          if (data.data && data.code === 0) {
            this.doctorTable.lists = data.data.doctorData;
          } else {
            this.doctorTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.doctorTable.loading = false;
          this.doctorTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  userExcel(){
    $('.userExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#userExcel")[0];
        $this.attr('download', '肾移植管家业务数据统计-患者端-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }

  doctorExcel(){
    $('.doctorExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#doctorExcel")[0];
        $this.attr('download', '肾移植管家业务数据统计-医生端-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }
}
