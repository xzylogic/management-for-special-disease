import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../entities';

import { HealthNewsService, HealthNewsTableService } from './_service';

declare var $: any;

@Component({
  selector: 'app-health-news',
  templateUrl: './health-news.component.html'
})
export class HealthNewsComponent implements OnInit {

  title = '健康资讯管理';
  subTitle = '健康资讯列表';

  healthNewsTable: TableOption;
  healthNewsType: any;
  selectedType = { id: null, name: '' };

  healthNewsData:any;
  enableEdit: boolean;
  
  readingquantity:any;
  enablereading: boolean;

  message: string;
  enableShow: boolean;

  delData: any;
  enableDel: boolean;

  constructor(
    private _healthNewsService: HealthNewsService,
    private _healthNewsTableService: HealthNewsTableService
  ) {}

  ngOnInit() {
    $('#healthNewsType').dropdown();
    this.refresh();
  }

  getType(opt) {
    this.healthNewsTable = new TableOption();
    this.getHealthNewsTitles();
    this.selectedType = opt;
    this.getHealthNews(0);
  }

  refresh() {
    this.healthNewsTable = new TableOption();
    this.getHealthNewsTitles();
    this.getReadCoefficient();
    this.getHealthNewsType()
      .subscribe(
        () => {
          this.getHealthNews(0);
        }, err => {
          this.healthNewsTable.loading = false;
          this.healthNewsTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getHealthNewsType() {
    return this._healthNewsService.getHealthNewsType()
      .map(
        data => {
          if (data.data && data.code == 0) {
            this.healthNewsType = data.data;
            this.selectedType = data.data[0];
          }
        })
  }

  getHealthNewsTitles() {
    this.healthNewsTable.titles = this._healthNewsTableService.setTitles();
  }

  getHealthNews(page: number) {
    this.healthNewsTable.currentPage = page;
    this._healthNewsService.getHealthNews(this.selectedType.id, page, this.healthNewsTable.size)
      .subscribe(
        data => {
          this.healthNewsTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.healthNewsTable.lists = null;
            this.healthNewsTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.healthNewsTable.totalPage = data.data.totalPages;
            this.healthNewsTable.lists = data.data.content;
          } else {
            this.healthNewsTable.lists = null;
            this.healthNewsTable.errorMessage = "啊哦！没有接收到数据哎～";
          }
        }, err => {
          this.healthNewsTable.loading = false;
          this.healthNewsTable.lists = null;
          this.healthNewsTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getReadCoefficient(){
     this._healthNewsService.healthNewsFetch()
    .subscribe(
      data =>{
        if(data.data && data.code === 0){
          this.readingquantity = data;
        }else{
          this.readingquantity = null;
          this.healthNewsTable.errorMessage = "啊哦！没有接收到数据哎～";
        } 
      },err =>{
         this.healthNewsTable.errorMessage = "啊哦！接口访问出错啦～";
      })
   }
  
  getHealthNewsSelected(div) {
    this.selectedType = div.target.value;
    this.getHealthNews(0);
  }

  gotoHandle(data) {
    if (data.key === 'edit') {
      this.healthNewsData = data.value;
      this.enableEdit = true;
    } else if (data.key === 'del') {
      this.delData = data.value;
      this.enableDel = true;
    }
  }

  newHealthNews() {
    this.healthNewsData = null;
    this.enableEdit = true;
  }

  newreadingQuantity(){
    this.enablereading = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getHealthNews(0);
    this.getReadCoefficient();
  }

  delete() {
    this._healthNewsService.healthNewsDelete(this.delData.id)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.delCancel();
            this.message = "删除成功";
            this.enableShow = true;
            this.getHealthNews(0);
          } else {
            this.delCancel();
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "删除失败";
            }
            this.enableShow = true;
          }
        }, err => {
          this.delCancel();
          this.message = "删除失败";
          this.enableShow = true;
        })
  }

  delCancel() {
    this.delData = null;
    this.enableDel = false;
  }

}
