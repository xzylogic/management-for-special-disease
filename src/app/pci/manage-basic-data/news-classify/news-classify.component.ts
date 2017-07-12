import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { NewsClassifyService, NewsClassifyTableService } from './_service';


@Component({
  selector: 'app-news-classify',
  templateUrl: './news-classify.component.html'
})
export class NewsClassifyComponent implements OnInit {
  title = '基础数据维护';
  subTitle = '健康资讯分类维护';
  loading: boolean = true;

  // 展示信息模态框选项
  titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

  classify:any;
  enableEdit: boolean;

  newsClassifyTable: TableOption = new TableOption();

  constructor(
    private _newsClassifyService: NewsClassifyService,
    private _newsClassifyTableService: NewsClassifyTableService
  ) {}

  ngOnInit() {
    this.getNewsClassifyTitles();
    this.getNewsClassifys();
  }

  getNewsClassifyTitles() {
    this.newsClassifyTable.titles = this._newsClassifyTableService.setTitles();
  }

  getNewsClassifys() {
    this._newsClassifyService.getNewsClassifies()
      .subscribe(
        data => {
          this.newsClassifyTable.loading = false;
          if (data.data && data.data && data.data.length === 0 && data.code === 0) {
            this.newsClassifyTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.newsClassifyTable.lists = data.data;
          } else {
            this.newsClassifyTable.errorMessage = "空空如也～";
          }
        },err =>{
          this.newsClassifyTable.loading = false;
          this.newsClassifyTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  refresh(){
    this.getNewsClassifys();
  }

  gotoHandle(data) {
    this.classify = data;
    this.enableEdit = true;
  }

  //新增健康资讯分类
  newNewsClassify(){
    this.classify = null;
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
