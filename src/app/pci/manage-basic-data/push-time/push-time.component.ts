import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import { PushTimeService, PushTimeTableService} from './_service';

@Component({
  selector: 'app-push-time',
  templateUrl: './push-time.component.html'
})
export class PushTimeComponent implements OnInit {
	title = '基础数据维护';
  subTitle = '推送时间维护';

	pushTimeTable: TableOption = new TableOption();

	titleShow: string;
  message: string;
  enableShow: boolean;
  errorMessage:string;

	pushtime:any;
  enableEdit: boolean;

  constructor(
  	private _pushtimeservice : PushTimeService,
  	private _pushtimetableservice: PushTimeTableService
  	) { }

  ngOnInit() {
  	this.getPushTimeTitles();
  	this.getPushTime();
  }

  getPushTimeTitles(){
  	this.pushTimeTable.titles = this._pushtimetableservice.setTitles();
  }

  getPushTime(){
  	this._pushtimeservice.getPushTime().subscribe(
  			data =>{
  				this.pushTimeTable.loading = false;
  				if (data.data && data.data.length === 0 && data.code === 0) {
            this.pushTimeTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.pushTimeTable.lists = [];
            this.pushTimeTable.lists.push(data.data);
          } else {
            this.pushTimeTable.errorMessage = "空空如也～";
          }
  			},err =>{
  				this.pushTimeTable.loading = false;
          this.pushTimeTable.errorMessage = "啊哦！接口访问出错啦～";
  	})
  }

  gotoHandle(data) {
    this.pushtime = data;
    this.enableEdit = true;
  }

  refresh(){
    this.getPushTime();
  }

  handleSuccess(data){
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

}
