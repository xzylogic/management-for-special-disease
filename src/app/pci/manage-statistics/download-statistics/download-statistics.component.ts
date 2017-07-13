import { Component, OnInit } from '@angular/core';
import { DownloadStatisticsService } from './_service/download-statistics.service';
import { DownloadStatisticsTableService } from './_service/download-statistics-table.service';

@Component({
  selector: 'app-download-statistics',
  templateUrl: 'download-statistics.component.html'
})
export class DownloadStatisticsComponent implements OnInit {
  // title = '渠道来源统计';
  // subTitle = '渠道来源统计列表';
  //
  // mainTable: TableOption = new TableOption;
  // userTable: TableOption = new TableOption;
  // doctorTable: TableOption = new TableOption;
  //
  // queryMainDate: any;
  // queryUserDate: any;
  // queryDoctorDate: any;

  constructor(
    private _service: DownloadStatisticsService,
    private _tableService: DownloadStatisticsTableService
  ) {
  }

  ngOnInit() {
    // this.defaultData();
    // this.initFlatpickr();
    // this.mainTable.titles = this._tableService.setMainTitles();
    // this.userTable.titles = this._tableService.setTitles();
    // this.doctorTable.titles = this._tableService.setTitles();
  }

  // //分解faltpickr形成的日期范围字符串并调用接口更新数据
  // clickUserSearch(queryDate){
  //   let date: string[] = (<string>queryDate).split(/[ ]/);
  //   var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
  //   var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
  //   this.getUserQueryResult(start, end);
  // }
  //
  // clickDoctorSearch(queryDate){
  //   let date: string[] = (<string>queryDate).split(/[ ]/);
  //   var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
  //   var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
  //   this.getDoctorQueryResult(start, end);
  // }
  //
  // clickMainSearch(queryDate){
  //   let date: string[] = (<string>queryDate).split(/[ ]/);
  //   var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
  //   var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
  //   this.getMainQueryResult(start, end);
  // }
  //
  // //计算当前时间前一周作为默认时间段调用接口并更新数据
  // defaultData() {
  //   //计算今天前一天日期
  //   let date1 = new Date();
  //   date1.setDate(date1.getDate() - 1);
  //   let oneDayBeforeToday = this.toDateString(date1);
  //   let oneDayBeforeTodayValue = this.toDateValue(date1, 24, 0, 0);
  //
  //   //计算今天前第七天日期
  //   let date2 = new Date();
  //   date2.setDate(date2.getDate()-7);
  //   let sevenDaysBeforeToday = this.toDateString(date2);
  //   let sevenDaysBeforeTodayValue = this.toDateValue(date2, 0, 0, 0);
  //
  //   //设置日期框默认日期
  //   this.queryMainDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
  //   this.queryUserDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
  //   this.queryDoctorDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
  //
  //   //调用接口更新默认数据，默认今天前第七天到今天前一天
  //   this.getMainQueryResult(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
  //   this.getUserQueryResult(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
  //   this.getDoctorQueryResult(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
  // }
  //
  // toDateString(date) {
  //   let Y = date.getFullYear().toString();
  //   let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
  //   let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
  //   return `${Y}-${M}-${D}`;
  // }
  //
  // toDateValue(date, h, m, s) {
  //   let Y = date.getFullYear();
  //   let M = date.getMonth();
  //   let D = date.getDate();
  //   return new Date(Y, M, D, h, m, s).valueOf();
  // }
  //
  // //初始化日期选择器Flatpickr
  // initFlatpickr(){
  //   $("#main").flatpickr({
  //     "locale": "zh",
  //     "mode": "range",
  //   });
  //   $("#user").flatpickr({
  //     "locale": "zh",
  //     "mode": "range",
  //   });
  //   $("#doctor").flatpickr({
  //     "locale": "zh",
  //     "mode": "range",
  //   });
  // }
  //
  // getMainQueryResult(start, end) {
  //   this.mainTable.loading = true;
  //   this.mainTable.lists = null;
  //   this._service.getDownloadStatistics(start, end, 2)
  //     .subscribe(data => {
  //       this.mainTable.loading = false;
  //       if (data.data && data.code === 0) {
  //         this.mainTable.lists = data.data;
  //       } else {
  //         this.mainTable.errorMessage = data.msg || "空空如也～";
  //       }
  //     }, err => {
  //       this.mainTable.loading = false;
  //       this.mainTable.errorMessage = "啊哦！接口访问出错啦～";
  //     });
  // }
  //
  // getUserQueryResult(start, end) {
  //   this.userTable.loading = true;
  //   this.userTable.lists = null;
  //   this._service.getDownloadStatistics(start, end, 0)
  //     .subscribe(data => {
  //       this.userTable.loading = false;
  //       if (data.data && data.code === 0) {
  //         this.userTable.lists = data.data;
  //         this.format(this.userTable.lists);
  //       } else {
  //         this.userTable.errorMessage = data.msg || "空空如也～";
  //       }
  //     }, err => {
  //       this.userTable.loading = false;
  //       this.userTable.errorMessage = "啊哦！接口访问出错啦～";
  //     });
  // }
  //
  // getDoctorQueryResult(start, end) {
  //   this.doctorTable.loading = true;
  //   this.doctorTable.lists = null;
  //   this._service.getDownloadStatistics(start, end, 1)
  //     .subscribe(data => {
  //       this.doctorTable.loading = false;
  //       if (data.data && data.code === 0) {
  //         this.doctorTable.lists = data.data;
  //         this.format(this.doctorTable.lists);
  //       } else {
  //         this.doctorTable.errorMessage = data.msg || "空空如也～";
  //       }
  //     }, err => {
  //       this.doctorTable.loading = false;
  //       this.doctorTable.errorMessage = "啊哦！接口访问出错啦～";
  //     });
  // }
  //
  // format(data) {
  //   if(typeof data == 'object') {
  //     data.forEach(obj => {
  //       obj.ios = `${obj.ios}/${obj.ios_u}`;
  //       obj.android = `${obj.android}/${obj.android_u}`;
  //     })
  //   }
  // }
}
