import { Component, Inject, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { HospitalService } from './_service/hospital.service';
import { HospitalTableService } from './_service/hospital-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Hospital } from './_entity/hospital.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html'
})
export class HospitalComponent implements OnInit {
  containerConfig: ContainerConfig;
  hospitalTable: TableOption;
  @select(['hospital', 'tab']) tab: Observable<number>;
  @select(['hospital', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private hospitalService: HospitalService,
    private hospitalTableService: HospitalTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('hospitalService', new Hospital());
  }

  ngOnInit() {
    this.containerConfig = this.hospitalService.hospitalConfig();
    this.hospitalTable = new TableOption({
      titles: this.hospitalTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getHospital();
    });
  }

  getHospital() {
    // this.action.pageChange('packageService', [page]);
    this.hospitalService.getHospital()
      .subscribe(res => {
        this.hospitalTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.hospitalTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.hospitalTable.totalPage = res.data.totalPages;
          this.hospitalTable.lists = res.data;
        } else {
          this.hospitalTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.hospitalTable.loading = false;
        console.log(err);
        this.hospitalTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('hospital', new Hospital());
    this.router.navigate(['/hospital/edit']);
  }

  gotoHandle(res) {
    const hospital = <Hospital>res.value;
    if (res.key === 'editHospital') {
      this.action.dataChange('hospital', hospital);
      this.router.navigate(['/hospital/edit']);
    }
  }

  // getHospitalTitles() {
  //   this.hospitalTable.titles = this._hospitalTableService.setTitles();
  // }
  //
  // getHospitals() {
  //   this._hospitalService.getHospitals()
  //     .subscribe(
  //        data => {
  //         this.hospitalTable.loading = false;
  //         if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.hospitalTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.hospitalTable.lists = data.data;
  //         } else {
  //           this.hospitalTable.errorMessage = "空空如也～";
  //         }
  //       },err =>{
  //         this.hospitalTable.loading = false;
  //         this.hospitalTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  // //编辑医院
  // gotoHandle(data) {
  //   this.hospital = data;
  //   this.enableEdit = true;
  // }
  // //刷新页面
  // refresh(){
  //   this.getHospitals();
  // }
  //
  // //新增医院
  // newHospital(){
  //   this.hospital = null;
  //   this.enableEdit = true;
  // }
  //
  //  //返回服务器信息
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
