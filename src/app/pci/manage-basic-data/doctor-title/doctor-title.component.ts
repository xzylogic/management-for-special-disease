import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorTitleService } from './_service/doctor-title.service';
import { DoctorTitleTableService } from './_service/doctor-title-table.service';

@Component({
  selector: 'app-doctor-title',
  templateUrl: './doctor-title.component.html'
})
export class DoctorTitleComponent implements OnInit {
  // title = '基础数据维护';
  // subTitle = '职称数据维护';
  // loading: boolean = true;
  //
  // // 展示信息模态框选项
  // titleShow: string;
  // message: string;
  // enableShow: boolean;
  // errorMessage:string;
  //
  // doctorTitle:any;
  // enableEdit: boolean;

  // doctorTitleTable: TableOption = new TableOption();

  constructor(
    private _doctorTitleService: DoctorTitleService,
    private _doctorTitleTableService: DoctorTitleTableService
  ) {
  }

  ngOnInit() {
    // this.getDoctorTitleTitles();
    // this.getDoctorTitles();
  }

  getDoctorTitleTitles() {
    // this.doctorTitleTable.titles = this._doctorTitleTableService.setTitles();
  }

  getDoctorTitles() {
    // this._doctorTitleService.getDoctorTitles()
    //   .subscribe(
    //      data => {
    //       this.doctorTitleTable.loading = false;
    //       if (data.data  && data.data.length === 0 && data.code === 0) {
    //         this.doctorTitleTable.errorMessage = "该数据为空哦～";
    //       } else if (data.data && data.code === 0) {
    //         this.doctorTitleTable.lists = data.data;
    //       } else {
    //         this.doctorTitleTable.errorMessage = "空空如也～";
    //       }
    //     },err =>{
    //       this.doctorTitleTable.loading = false;
    //       this.doctorTitleTable.errorMessage = "啊哦！接口访问出错啦～";
    //     })
  }

  // gotoHandle(data) {
  //   this.doctorTitle = data;
  //   this.enableEdit = true;
  // }
  //
  // refresh(){
  //   this.getDoctorTitles();
  // }
  //
  // //新增职称
  // newDoctorTitle(){
  //   this.doctorTitle = null;
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
