import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { ServiceSpecService } from './_service/service-spec.service';
import { ServiceSpecTableService } from './_service/service-spec-table.service';

@Component({
  selector: 'app-service-apec',
  templateUrl: 'service-spec.component.html'
})
export class ServiceSpecComponent implements OnInit {

  // title = '服务规格维护';
  // subTitle = '服务规格列表';
  //
  // serviceSpecTable: TableOption;
  //
  // serviceSpec: any;
  // enableEdit: boolean;
  //
  // titleShow: string;
  // message: string;
  // enableShow: boolean;

  constructor(
    private _serviceSpecService: ServiceSpecService,
    private _serviceSpecTableService: ServiceSpecTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh() {
  //   this.serviceSpecTable = new TableOption();
  //   this.getServiceSpecTitles();
  //   this.getServiceSpecs(0);
  // }
  //
  // getServiceSpecTitles() {
  //   this.serviceSpecTable.titles = this._serviceSpecTableService.setTitles();
  // }
  //
  // getServiceSpecs(page) {
  //   this.serviceSpecTable.currentPage = page;
  //   this._serviceSpecService.getServiceSpec(page, this.serviceSpecTable.size)
  //     .subscribe(
  //     res => {
  //       this.serviceSpecTable.loading = false;
  //       if (res.data && res.data.content.length === 0 && res.code === 0) {
  //         this.serviceSpecTable.errorMessage = "该数据为空哦～";
  //       } else if (res.data && res.data.content && res.code === 0) {
  //         this.serviceSpecTable.lists = res.data.content;
  //         this.serviceSpecTable.totalPage = res.data.totalPages;
  //       } else {
  //         this.serviceSpecTable.errorMessage = res.msg || "空空如也～";
  //       }
  //     }, err => {
  //       this.serviceSpecTable.loading = false;
  //       this.serviceSpecTable.errorMessage = "啊哦！接口访问出错啦～";
  //     });
  // }
  //
  // gotoHandle(data) {
  //   console.log(data);
  //   if (data.key === 'edit') {
  //     this.serviceSpec = data.value;
  //     this.enableEdit = true;
  //   }
  // }
  //
  // newServiceSpec(){
  //   this.serviceSpec = null;
  //   this.enableEdit = true;
  // }
  //
  // handleSuccess(data) {
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.getServiceSpecs(0);
  // }
}
