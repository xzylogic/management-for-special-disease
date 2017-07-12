import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { HospitalService, HospitalTableService } from './_service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html'
})
export class HospitalComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '医院数据维护';
  loading: boolean = true;
  selectedOption: string;

  // 展示信息模态框选项
  titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

  hospital:any;
  enableEdit: boolean;

  hospitalTable: TableOption = new TableOption();

  constructor(
    private _hospitalService: HospitalService,
    private _hospitalTableService: HospitalTableService,
  ) {}

  ngOnInit() {
    this.getHospitalTitles();
    this.getHospitals();
  }

  getHospitalTitles() {
    this.hospitalTable.titles = this._hospitalTableService.setTitles();
  }

  getHospitals() {
    this._hospitalService.getHospitals()
      .subscribe(
         data => {
          this.hospitalTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.hospitalTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.hospitalTable.lists = data.data;
          } else {
            this.hospitalTable.errorMessage = "空空如也～";
          }
        },err =>{
          this.hospitalTable.loading = false;
          this.hospitalTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }
  //编辑医院
  gotoHandle(data) {
    this.hospital = data;
    this.enableEdit = true;
  }
  //刷新页面
  refresh(){
    this.getHospitals();
  }

  //新增医院
  newHospital(){
    this.hospital = null;
    this.enableEdit = true;
  }

   //返回服务器信息
  handleSuccess(data){
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

}
