import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { PackageServiceService, PackageServiceTableService } from './_service';

@Component({
  selector: 'app-package-service',
  templateUrl: './package-service.component.html'
})
export class PackageServiceComponent implements OnInit {
  title = '套餐包维护';
  subTitle = '套餐包列表';
  loading: boolean = true;

  // 展示信息模态框选项
  titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

  package:any;
  enableEdit: boolean;

  DoctorServiceList:any; //医生服务列表;
  HealthServiceList:any; //第三方服务列表;

  packageServiceTable: TableOption = new TableOption();

  constructor(
    private _packageServiceService: PackageServiceService,
    private _packageServiceTableService: PackageServiceTableService
  ) {}

  ngOnInit() {
    this.getPackageServiceTitles();
    this.getPackageServices();
    this.getDoctorService();
    this.getHealthService();
  }

  getPackageServiceTitles() {
    this.packageServiceTable.titles = this._packageServiceTableService.setTitles();
  }

  getPackageServices() {
    this._packageServiceService.getPackageServices()
      .subscribe(
        data => {
          this.packageServiceTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.packageServiceTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.packageServiceTable.lists = data.data;
          } else {
            this.packageServiceTable.errorMessage = "空空如也～";
          }
        },err =>{
          this.packageServiceTable.loading = false;
          this.packageServiceTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  // 获取医生服务列表
  getDoctorService() {
    this._packageServiceService.getServiceOptionD()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.DoctorServiceList = data.data;
          }
      })
  }

   //获取第三方服务列表
  getHealthService() {
    this._packageServiceService.getServiceOptionT()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.HealthServiceList = data.data;
          }
      })
  }

  //编辑套餐包
  gotoHandle(data) {
    this.package = data;
    this.enableEdit = true;
  }
  //刷新页面
  refresh(){
    this.getPackageServices();
  }

  //新增套餐包
  newPackageService(){
    this.package = null;
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
