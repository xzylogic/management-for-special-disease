import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { DownloadOriginService } from './_service/download-origin.service';
import { DownloadOriginTableService } from './_service/download-origin-table.service';

@Component({
  selector: 'app-download-origin',
  templateUrl: './download-origin.component.html'
})
export class DownloadOriginComponent implements OnInit {
  // title = '渠道来源维护';
  // subTitle = '渠道来源列表';
  //
  // // 展示信息模态框选项
  // titleShow: string;
  // message: string;
  // enableShow: boolean;
  //
  // downloadOriginTable: TableOption = new TableOption();
  // data: any;
  // enableEdit: boolean;

  constructor(
    private downloadOriginService: DownloadOriginService,
    private downloadOriginTableService: DownloadOriginTableService
  ) {
  }

  ngOnInit() {
    // this.getDownloadOriginTitles();
    // this.getDownloadOrigins();
  }

  refresh() {
    // this.getDownloadOrigins();
  }

  //
  // getDownloadOriginTitles() {
  //   this.downloadOriginTable.titles = this._downloadOriginTableService.setTitles();
  // }
  //
  // getDownloadOrigins() {
  //   this._downloadOriginService.getDownloadOrigin()
  //     .subscribe(
  //        data => {
  //         this.downloadOriginTable.loading = false;
  //         if (data.data  && data.data.length === 0 && data.code === 0) {
  //           this.downloadOriginTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.downloadOriginTable.lists = data.data;
  //         } else {
  //           this.downloadOriginTable.errorMessage = "空空如也～";
  //         }
  //       },err =>{
  //         this.downloadOriginTable.loading = false;
  //         this.downloadOriginTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // gotoHandle(data) {
  //   if(data.key === 'edit') {
  //     this.data = data.value;
  //     this.enableEdit = true;
  //   }
  //   if(data.key === 'del') {
  //     this._downloadOriginService.downloadOriginDel(data.value.id)
  //       .subscribe(res => {
  //         if (res.code === 0) {
  //           this.handleSuccess(res.msg || '删除渠道成功');
  //         } else {
  //           this.titleShow = '提示信息';
  //           this.message = res.msg || '操作失败';
  //           this.enableShow = true;
  //         }
  //       }, err => {
  //         this.titleShow = '提示信息';
  //         this.message = '啊哦！连接服务器出错了～';
  //         this.enableShow = true;
  //       });
  //   }
  // }
  //
  //
  // //新增职称
  // newDownloadOrigin(){
  //   this.data = null;
  //   this.enableEdit = true;
  // }
  //
  //
  //  //返回服务器信息
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
