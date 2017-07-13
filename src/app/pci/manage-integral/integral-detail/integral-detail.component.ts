import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';

@Component({
  selector: 'app-integral-detail',
  templateUrl: 'integral-detail.component.html'
})
export class IntegralDetailComponent implements OnInit {
  // title = '积分管理';
  // subTitle = '积分明细';
  //
  // userIntegralDetailTable: TableOption;
  // doctorIntegralDetailTable: TableOption;
  //
  // userIntegralDetail: any;
  // doctorIntegralDetail: any;
  //
  // queryKey: string;

  constructor(
    private integralDetailService: IntegralDetailService,
    private integralDetailTableService: IntegralDetailTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh() {
  //   this.getUserIntegralDetail(0);
  //   this.getDoctorIntegralDetail(0);
  // }
  //
  // reset() {
  //   this.queryKey = null;
  //   this.getUserIntegralDetail(0);
  //   this.getDoctorIntegralDetail(0);
  // }
  //
  // getUserIntegralTitles() {
  //   this.userIntegralDetailTable.titles = this._integralDetailTableService.setTitles();
  // }
  //
  // getDoctorIntegralTitles() {
  //   this.doctorIntegralDetailTable.titles = this._integralDetailTableService.setTitles();
  // }
  //
  // getUserIntegralDetail(page: number) {
  //   this.userIntegralDetailTable = new TableOption();
  //   this.userIntegralDetail = null;
  //   this.getUserIntegralTitles();
  //   this.userIntegralDetailTable.currentPage = page;
  //   let option: any = { flag: page, type: 0 };
  //   if (this.queryKey) {
  //     option.param = this.queryKey;
  //   }
  //   this._integralDetailService.getIntegralDetail(option)
  //     .subscribe(
  //       data => {
  //         this.userIntegralDetailTable.loading = false;
  //         if (data.data  && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.userIntegralDetailTable.errorMessage = "当前数据为空哦～";
  //         } else if (data.data  && data.data.content && data.code === 0) {
  //           this.userIntegralDetailTable.totalPage = data.data.totalPages;
  //           this.userIntegralDetailTable.lists = data.data.content;
  //           if (data.data.content) {
  //             this.userIntegralDetailTable.lists = data.data.content;
  //             // console.log(data.data.content);
  //           }
  //         } else {
  //           this.userIntegralDetailTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.userIntegralDetailTable.loading = false;
  //         this.userIntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getDoctorIntegralDetail(page: number) {
  //   this.doctorIntegralDetailTable = new TableOption();
  //   this.doctorIntegralDetail = null;
  //   this.getDoctorIntegralTitles();
  //   this.doctorIntegralDetailTable.currentPage = page;
  //   let option: any = { flag: page, type: 1 };
  //   if (this.queryKey) {
  //     option.param = this.queryKey;
  //   }
  //   this._integralDetailService.getIntegralDetail(option)
  //     .subscribe(
  //       data => {
  //         this.doctorIntegralDetailTable.loading = false;
  //         if (data.data  && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.doctorIntegralDetailTable.errorMessage = "当前数据为空哦～";
  //         } else if (data.data  && data.data.content && data.code === 0) {
  //           this.doctorIntegralDetailTable.totalPage = data.data.totalPages;
  //           this.doctorIntegralDetailTable.lists = data.data.content;
  //           if (data.data.content) {
  //             this.doctorIntegralDetailTable.lists = data.data.content;
  //             // console.log(data.data.content);
  //           }
  //         } else {
  //           this.doctorIntegralDetailTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.doctorIntegralDetailTable.loading = false;
  //         this.doctorIntegralDetailTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
}
