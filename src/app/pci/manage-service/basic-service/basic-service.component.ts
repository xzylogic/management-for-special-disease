import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { BasicServiceService } from './_service/basic-service.service';
import { BasicServiceTableService } from './_service/basic-service-table.service';

@Component({
  selector: 'app-basic-service',
  templateUrl: './basic-service.component.html'
})
export class BasicServiceComponent implements OnInit {
  // title = '基础服务维护';
  // subTitle = '基础服务列表';

  // basicServiceTable: TableOption;

  // basicService: any;
  // enableEdit: boolean;
  //
  // titleShow: string;
  // message: string;
  // enableShow: boolean;

  constructor(
    private _basicServiceService: BasicServiceService,
    private _basicServiceTableService: BasicServiceTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh() {
  //   this.basicServiceTable = new TableOption();
  //   this.getBasicServiceTitles();
  //   this.getBasicServices();
  // }
  //
  // getBasicServiceTitles() {
  //   this.basicServiceTable.titles = this._basicServiceTableService.setTitles();
  // }
  //
  // getBasicServices() {
  //   this._basicServiceService.getBasicServices()
  //     .subscribe(
  //       data => {
  //         this.basicServiceTable.loading = false;
  //         if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.basicServiceTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.basicServiceTable.lists = data.data;
  //         } else {
  //           this.basicServiceTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.basicServiceTable.loading = false;
  //         this.basicServiceTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // gotoHandle(data) {
  //   if (data.key === 'edit') {
  //     this.basicService = data.value;
  //     this.enableEdit = true;
  //   }
  // }
  //
  // handleSuccess(data) {
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.getBasicServices();
  // }
}
