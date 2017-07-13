import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { FollowUpPlanService } from './_service/follow-up-plan.service';
import { FollowUpPlanTableService } from './_service/follow-up-plan-table.service';

@Component({
  selector: 'app-follow-up-plan',
  templateUrl: './follow-up-plan.component.html'
})
export class FollowUpPlanComponent implements OnInit {
  // followUpPlanTable1: TableOption = new TableOption();
  discomfortTypes: any;

  constructor(
    private _followUpPlanService: FollowUpPlanService,
    private _followUpPlanTableService: FollowUpPlanTableService
  ) {
  }

  ngOnInit() {
    // this.getFollowUpPlanTitles();
    // this.getFollowUpPlans(1, this.followUpPlanTable1);
    // this.getFollowUpPlans(3, this.followUpPlanTable2);
    // this.getFollowUpPlans(6, this.followUpPlanTable3);
    // this.getFollowUpPlans(9, this.followUpPlanTable4);
    // this.getFollowUpPlans(12, this.followUpPlanTable5);
  }

  getFollowUpPlanTitles() {
    // this.followUpPlanTable1.titles = this._followUpPlanTableService.setTitles();
    // this.followUpPlanTable2.titles = this._followUpPlanTableService.setTitles();
    // this.followUpPlanTable3.titles = this._followUpPlanTableService.setTitles();
    // this.followUpPlanTable4.titles = this._followUpPlanTableService.setTitles();
    // this.followUpPlanTable5.titles = this._followUpPlanTableService.setTitles();
  }

  getFollowUpPlans(id: number, list: TableOption) {
    // list.lists = [];
    // this._followUpPlanService.getFollowUpPlans(id)
    //   .subscribe(
    //     data => {
    //       this.followUpPlanTable1.loading = false;
    //       if(data.data && data.code === 0){
    //         this.followUpPlanFormat(data.data);
    //         data.data.forEach(obj => {
    //           list.lists.push(obj);
    //         })
    //     }
    //   },err =>{
    //      this.followUpPlanTable1.loading = false;
    //      this.followUpPlanTable1.errorMessage = "啊哦！接口访问出错啦～";
    //   })
  }

  refresh() {
    // this.getFollowUpPlans(1,this.followUpPlanTable1);
    // this.getFollowUpPlans(3,this.followUpPlanTable2);
    // this.getFollowUpPlans(6,this.followUpPlanTable3);
    // this.getFollowUpPlans(9,this.followUpPlanTable4);
    // this.getFollowUpPlans(12,this.followUpPlanTable5);
  }

  gotoHandle(data) {
    // if(data.key === "edit"){
    //    this.follow = data;
    //    this.enableEdit = true;
    // }else if(data.key === "del"){
    //   this.processData = data;
    //   this.processMessage = '你确定要删除？';
    //   this.enableProcess = true;
    // }
  }

  followUpPlanFormat(data) {
    // data.forEach(obj => {
    //   if (obj.custom === true) {
    //     obj.customName = obj.name;
    //     obj.name = '自定义';
    //   }
    // })
  }

  // 新增随访项
  newFollowUpPlan() {
    // this.follow = null;
    // this.enableEdit = true;
  }

  // 返回服务器信息
  handleSuccess(data) {
    // this.titleShow = '提示信息';
    // this.message = data;
    // this.enableShow = true;
    // this.refresh();
  }

  // 确定删除
  process() {
    // this._followUpPlanService.followUpPlanDelete(this.processData.value.id)
    // .subscribe(
    //       data => {
    //         this.enableProcess = false;
    //         if (data.code === 0) {
    //           this.titleShow = "提示信息"
    //           this.message = "删除成功";
    //           this.enableShow = true;
    //           this.refresh();
    //         } else {
    //           this.titleShow = "提示信息"
    //           this.message = "操作失败";
    //           this.enableShow = true;
    //         }
    //       }, err => {
    //         this.enableProcess = false;
    //         this.titleShow = "提示信息"
    //         this.message = "啊哦！访问出错啦～";
    //         this.enableShow = true;
    //       })
  }

  // 取消删除
  processCancel() {
    // this.processData = null;
    // this.processMessage = '';
    // this.enableProcess = false;
  }
}
