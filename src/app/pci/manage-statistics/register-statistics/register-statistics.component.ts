import { Component, OnInit } from '@angular/core';
import { TableOption } from '../../../entities';
import { RegisterStatisticsTableService, RegisterStatisticsService } from './_service';

@Component({
  selector: 'register-statistics',
  templateUrl: 'register-statistics.component.html'
})
export class RegisterStatisticsComponent implements OnInit {
  title = '数据统计';
  subTitle = '注册量统计';

  userTable: TableOption = new TableOption();
  doctorTable: TableOption = new TableOption();

  userRegisterCount: number;

  doctorRegisterCount: number;
  doctorValidateCount: number;

  constructor(
    private _registerStatisticsService: RegisterStatisticsService,
    private _registerStatisticsTableService: RegisterStatisticsTableService
  ) {}

  ngOnInit() {
    this.getUserTitles();
    this.getDoctorTitles();
    this.getUsers(0);
    this.getDoctors(0);
    this.getUserCount();
    this.getDoctorCount();
  }

  getUserTitles() {
    this.userTable.titles = this._registerStatisticsTableService.setUserTitles();
  }

  getDoctorTitles() {
    this.doctorTable.titles = this._registerStatisticsTableService.setDoctorTitles();
  }

  refresh(){
    this.getUsers(0);
    this.getDoctors(0);
    this.getUserCount();
    this.getDoctorCount();
  }

  getUserCount(){
    this._registerStatisticsService.getUserTotals()
    .subscribe(
      data => {
        if(data.code === 0 ) {
          this.userRegisterCount = data.data.registerCount;
        }
      }
    )
  }

  getDoctorCount(){
    this._registerStatisticsService.getDoctorTotals()
    .subscribe(
      data => {
        if(data.code === 0 ) {
          this.doctorRegisterCount = data.data.registerCount;
          this.doctorValidateCount = data.data.validateCount;
        }
      }
    )
  }

  getUsers(page: number) {
    this.userTable.currentPage = page;
    this._registerStatisticsService.getUsers(page, this.userTable.size)
      .subscribe(
        data => {
          this.userTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.userTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.userTable.totalPage = data.data.totalPages;
            this.userTable.lists = data.data.content;
          }else {
            this.userTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.userTable.loading = false;
          this.userTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getDoctors(page: number) {
    this.doctorTable.currentPage = page;
    this._registerStatisticsService.getDoctors(page, this.doctorTable.size)
      .subscribe(
        data => {
          this.doctorTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.doctorTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.doctorTable.totalPage = data.data.totalPages;
            this.doctorTable.lists = data.data.content;
          }else {
            this.doctorTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.doctorTable.loading = false;
          this.doctorTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }
}