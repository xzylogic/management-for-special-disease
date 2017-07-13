import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../libs/dtable/dtable.entity';
import { OperationPushService } from './_service/operation-push-service.service';
import { OperationPushTableService } from './_service/operation-push-service-table.service';

@Component({
  selector: 'app-operation-push',
  templateUrl: './operation-push.component.html',
  styleUrls: ['./operation-push.component.css']
})
export class OperationPushComponent implements OnInit {

  // title = '运营消息推送';
  // subTitle = '运营推送';
  //
  // titleShow: string;
  // message: string;
  // enableShow: boolean;
  // errorMessage:string;
  //
  // sendShow:boolean;
  // sendMessage:string;
  //
  // operationpush:any;
  // enableEdit: boolean;
  //
  // enableProcess: boolean;
  // processMessage: string;
  // processData: any;

  // operationPushTable: TableOption = new TableOption();
  // operationPushDoctorTable: TableOption = new TableOption();

  constructor(
    private operationpushservice: OperationPushService,
    private operationpushtableservice: OperationPushTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh(){
  //   this.getOperationPushTitles()
  //   this.getOperationPushUser(0);
  //   this.getOperationPushDoctor(0);
  // }
  //
  // getOperationPushTitles(){
  // 	this.operationPushTable.titles = this._operationpushtableservice.setTitles();
  // }
  //
  // getOperationPushUser(page:number){
  //   this.operationPushTable.errorMessage = '';
  //   this.operationPushTable.loading = true;
  //   this.operationPushTable.lists = null;
  //   this.operationPushTable.currentPage = page;
  // 	this._operationpushservice.getOperationPush(0,page).subscribe(
  // 		data => {
  // 			this.operationPushTable.loading = false;
  // 				if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.operationPushTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.operationPushTable.totalPage = data.data.totalPages;
  //           this.operationPushTable.lists = data.data.content;
  //           for (var i = 0; i < this.operationPushTable.lists.length; ++i) {
  //           	this.operationPushTable.lists[i].state =this.getStatus(this.operationPushTable.lists[i].status);
  //           }
  //         } else {
  //           this.operationPushTable.errorMessage = "空空如也～";
  //         }
  // 		},err =>{
  // 			this.operationPushTable.loading = false;
  //       this.operationPushTable.errorMessage = "啊哦！接口访问出错啦～";
  // 		})
  // }
  //
  // getOperationPushDoctor(page:number){
  // 	this._operationpushservice.getOperationPush(1,page).subscribe(
  // 		data => {
  // 			this.operationPushDoctorTable.loading = false;
  // 				if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.operationPushDoctorTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.operationPushDoctorTable.lists = data.data.content;
  //         } else {
  //           this.operationPushDoctorTable.errorMessage = "空空如也～";
  //         }
  // 		},err =>{
  // 			this.operationPushDoctorTable.loading = false;
  //       this.operationPushDoctorTable.errorMessage = "啊哦！接口访问出错啦～";
  // 		})
  // }
  //
  // gotoHandle(value,data) {
  //     if (value === "edit") {
  //       this.operationpush = data;
  //       this.enableEdit = true;
  //     } else if (value === "send") {
  //       this.processData = data;
  //       this.processData.key = value;
  //       this.processMessage = '你确定要发送？';
  //       this.enableProcess = true;
  //     } else if ( value === "delete"){
  //     	this.processData = data;
  //       this.processData.key = value;
  //       this.processMessage = '你确定要删除？';
  //       this.enableProcess = true;
  //     }
  // }
  //
  //
  // newOperationPush(){
  // 	this.operationpush = null;
  //   this.enableEdit = true;
  // }
  //
  // getStatus(status){
  // 	if(status == "1"){
  // 		return "已发送";
  // 	}else{
  // 		return "待发送";
  // 	}
  // }
  //
  // //确定发送,删除
  // process() {
  //   if(this.processData.key === "send"){
  //      this.enableProcess = false;
  //      this.sendMessage = "正在发送，请稍后...";
  //      this.sendShow = true;
  //      this._operationpushservice.OperationPushSend(this.processData.id)
  //       .subscribe(
  //         data => {
  //           this.sendShow = false;
  //           if (data.code === 0) {
  //             this.titleShow = "提示信息"
  //             this.message = "操作成功";
  //             this.enableShow = true;
  //             this.refresh();
  //           } else {
  //             this.titleShow = "提示信息"
  //             this.message = "操作失败";
  //             this.enableShow = true;
  //           }
  //         }, err => {
  //           this.sendShow = false;
  //           this.titleShow = "提示信息"
  //           this.message = "啊哦！访问出错啦～";
  //           this.enableShow = true;
  //       })
  //   }else{
  //     this._operationpushservice.OperationPushDelete(this.processData.id)
  //       .subscribe(
  //         data => {
  //           this.enableProcess = false;
  //           if (data.code === 0) {
  //             this.titleShow = "提示信息"
  //             this.message = "操作成功";
  //             this.enableShow = true;
  //             this.refresh();
  //           } else {
  //             this.titleShow = "提示信息"
  //             this.message = "操作失败";
  //             this.enableShow = true;
  //           }
  //         }, err => {
  //           this.enableProcess = false;
  //           this.titleShow = "提示信息"
  //           this.message = "啊哦！访问出错啦～";
  //           this.enableShow = true;
  //       })
  //   }
  //
  // }
  //
  // //取消发送、删除
  // processCancel() {
  //   this.processData = null;
  //   this.processMessage = '';
  //   this.enableProcess = false;
  // }
  //
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
