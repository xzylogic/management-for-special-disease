import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { FollowUpPlanService } from './_service/follow-up-plan.service';
import { FollowUpPlanTableService } from './_service/follow-up-plan-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-follow-up-plan',
  templateUrl: './follow-up-plan.component.html'
})
export class FollowUpPlanComponent implements OnInit {
  containerConfig: ContainerConfig;
  followUpPlanTable: TableOption;
  discomfortTypes = [{
    id: 1,
    name: '一个月'
  }, {
    id: 3,
    name: '三个月'
  }, {
    id: 6,
    name: '六个月'
  }, {
    id: 9,
    name: '九个月'
  }, {
    id: 12,
    name: '十二个月'
  }];

  constructor(
    private followUpPlanService: FollowUpPlanService,
    private followUpPlanTableService: FollowUpPlanTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followUpPlanService.followUpPlanConfig();
    this.followUpPlanTable = new TableOption({
      titles: this.followUpPlanTableService.setTitles(),
      ifPage: false
    });
    this.followUpPlanTable.queryKey = 1;
    this.getFollowUpPlans();
  }

  getFollowUpPlans() {
    this.followUpPlanService.getFollowUpPlans(this.followUpPlanTable.queryKey)
      .subscribe(res => {
        this.followUpPlanTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.followUpPlanTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.followUpPlanFormat(res.data);
          this.followUpPlanTable.lists = res.data;
        } else {
          this.followUpPlanTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.followUpPlanTable.loading = false;
        console.log(err);
        this.followUpPlanTable.errorMessage = ERRMSG.netErrMsg;
      })
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
    data.forEach(obj => {
      if (obj.custom === true) {
        obj.customName = obj.name;
        obj.name = '自定义';
      }
    });
  }

  // 新增随访项
  newData() {
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
