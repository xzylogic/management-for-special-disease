import { Component, OnInit, Inject } from '@angular/core';

import { BusinessStatisticsService } from './_service/business-statistics.service';
import { BusinessStatisticsTableService } from './_service/business-statistics-table.service';
import { TableOption, ContainerConfig } from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-business-statistics',
  templateUrl: 'business-statistics.component.html'
})
export class BusinessStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  businessUserTable: TableOption;
  businessDoctorTable: TableOption;
  queryUserDate: any;
  queryDoctorDate: any;

  constructor(
    @Inject('search') private search,
    private businessservice: BusinessStatisticsService,
    private businesstableService: BusinessStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.businessservice.businessConfig();
    this.businessUserTable = new TableOption({
      titles: this.businesstableService.setTitles(),
      ifPage: false
    });
    this.businessDoctorTable = new TableOption({
      titles: this.businesstableService.setTitles(),
      ifPage: false
    });
    this.queryUserDate = this.search.setDefaultRange();
    this.queryDoctorDate = this.search.setDefaultRange();
    this.getUserData();
    this.getDoctorData();
  }

  getUserData() {
    const option = this.search.getStartAndEnd(this.queryUserDate);
    this.businessUserTable.reset();
    this.businessservice.getData(option.start, option.end)
      .subscribe(
        res => {
          this.businessUserTable.loading = false;
          if (res.data && res.code === 0) {
            this.businessUserTable.lists = res.data.userData;
          } else {
            this.businessUserTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.businessUserTable.loading = false;
          console.log(err);
          this.businessUserTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getDoctorData() {
    const option = this.search.getStartAndEnd(this.queryDoctorDate);
    this.businessDoctorTable.reset();
    this.businessservice.getData(option.start, option.end)
      .subscribe(
        res => {
          this.businessDoctorTable.loading = false;
          if (res.data && res.code === 0) {
            this.businessDoctorTable.lists = res.data.doctorData;
          } else {
            this.businessDoctorTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.businessDoctorTable.loading = false;
          console.log(err);
          this.businessDoctorTable.errorMessage = ERRMSG.netErrMsg;
        })
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
