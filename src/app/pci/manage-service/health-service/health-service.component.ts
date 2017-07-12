import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { HealthServiceService, HealthServiceTableService } from './_service';

@Component({
  selector: 'app-health-service',
  templateUrl: './health-service.component.html'
})
export class HealthServiceComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '第三方服务维护';
  loading: boolean = true;

  // 展示信息模态框选项
  titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

  healthService:any;
  enableEdit: boolean;
  organization:any;//第三方服务列表

  healthServiceTable: TableOption = new TableOption();

  constructor(
    private _healthServiceService: HealthServiceService,
    private _healthServiceTableService: HealthServiceTableService
  ) {}

  ngOnInit() {
    this.getHealthServiceTitles();
    this.getHealthServices(0);
    this.getHealthService();
  }

  getHealthServiceTitles() {
    this.healthServiceTable.titles = this._healthServiceTableService.setTitles();
  }

  getHealthServices(page: number) {
    this.healthServiceTable.currentPage = page;
    this._healthServiceService.getHealthServices(page, this.healthServiceTable.size)
      .subscribe(
         data => {
          this.healthServiceTable.loading = false;
          if (data.data && data.data.content.length === 0 && data.code === 0) {
            this.healthServiceTable.errorMessage = "该数据为空哦～";
          } else if (data.data &&data.data.content && data.code === 0) {
            this.healthServiceTable.lists = data.data.content;
            this.healthServiceTable.totalPage = data.data.totalPages;
            for (var i = 0; i < data.data.content.length; i++) {
              data.data.content[i].enable = this.setAudit(data.data.content[i].enable);
            }
          } else {
            this.healthServiceTable.errorMessage = "空空如也～";
          }
        },err =>{
          this.healthServiceTable.loading = false;
          this.healthServiceTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

 //编辑套餐包
  gotoHandle(data) {
    this.healthService = data;
    this.enableEdit = true;
  }
  //刷新页面
  refresh(){
    this.getHealthServices(0);
  }

   //获取第三方服务列表
  getHealthService() {
    this._healthServiceService.getOrganization()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.organization = data.data;
          }
      })
  }

 //状态信息转换
  setAudit(statu){
    if(statu === true) {
      return '启用';
    }
    if(statu === false) {
      return '禁用';
    }
    return null;
  }
  
  //新增套餐包
  newHealthService(){
    this.healthService = null;
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
