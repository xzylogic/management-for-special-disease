import { Component, OnInit, AfterViewInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { DoctorSortService } from './_service/doctor-sort.service';
import { DoctorSortTableService } from './_service/doctor-sort-table.service';

@Component({
  selector: 'app-doctor-sort',
  templateUrl: 'doctor-sort.component.html'
})
export class DoctorSortComponent implements OnInit, AfterViewInit {

  // title = '基础数据维护';
  // subTitle = '医生排序';
  // loading: boolean = true;
  //
  // // 展示信息模态框选项
  // titleShow: string;
  // message: string;
  // enableShow: boolean;
  // errorMessage: string;
  //
  // doctorsort: any;
  // enableEdit: boolean;
  //
  // doctorSortTable: TableOptiontion = new TableOption();
  //
  // hospitalList: any;
  // queryKey: string;
  // queryHospital: any;

  constructor(
    private _doctorsortService: DoctorSortService,
    private _doctorsortTableService: DoctorSortTableService
  ) {
  }

  ngOnInit() {
    // this.getDoctorSort(0);
    // this.getHospital();
  }

  ngAfterViewInit() {
    // $('#hospitalList').dropdown();
  }

  // getSortTitles() {
  //   this.doctorSortTable.titles = this._doctorsortTableService.setTitles();
  // }
  //
  // getDoctorSort(page: number) {
  //   this.doctorSortTable = new TableOption();
  //   this.getSortTitles();
  //   this.doctorSortTable.currentPage = page;
  //   this._doctorsortService.getDoctorRank(
  //       page,
  //       this.doctorSortTable.size,
  //       this.queryKey || '',
  //       this.queryHospital == 0 ? '' : this.queryHospital
  //     )
  //     .subscribe(
  //       data => {
  //         this.doctorSortTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.doctorSortTable.errorMessage = "该数据为空哦～";
  //           this.doctorSortTable.lists = null;
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.doctorSortTable.totalPage = data.data.totalPages;
  //           this.doctorSortTable.lists = data.data.content;
  //           for (let i = 0; i < this.doctorSortTable.lists.length; i++) {
  //             this.doctorSortTable.lists[i].hospital = this.doctorSortTable.lists[i].hospital.name;
  //             this.doctorSortTable.lists[i].department = this.doctorSortTable.lists[i].department.name;
  //           }
  //         } else {
  //           this.doctorSortTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.doctorSortTable.loading = false;
  //         this.doctorSortTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getHospital() {
  //   this._doctorsortService.getDoctor()
  //     .subscribe(data => {
  //       if (data.data && data.code === 0) {
  //         data.data.unshift({ id: 0, name: '全部医院' });
  //         this.hospitalList = data.data;
  //         this.queryHospital = '';
  //       }
  //     })
  // }
  //
  // resetUser() {
  //   this.queryKey = '';
  //   this.queryHospital = '';
  //   $('.text').text('按医院搜索');
  //   $('.text').addClass('default');
  //   this.getDoctorSort(0);
  // }
  //
  // gotoHandle(data) {
  //   this.doctorsort = data;
  //   this.enableEdit = true;
  // }
  //
  // refresh() {
  //   this.getHospital();
  //   this.getDoctorSort(0);
  // }
  //
  // //返回服务器信息
  // handleSuccess(data) {
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }

}
