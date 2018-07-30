import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { FollowPlanService } from '../_service/followUp-plan.service';
import { FollowPlanTableService } from '../_service/followUp-plan-table.service';
import { FollowPlan } from '../_entity/followUp-plan.entity';
import {ActivatedRoute} from '@angular/router';

const PATH = {
  // followList: 'api/doctorPatient/flup', // 随访计划详情列表
  followList: 'api/follow-up/flup/detail', // 随访计划详情列表
};
@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  planDetailTable: TableOption;
  planDetailList: any;
  data: any;
  planDate: any;
  // createTime: any;
  firstFlupTime: any;
  date: any;
  // planTime: any;
  @select(['followPlan', 'data']) followPlan: Observable<FollowPlan>;

  constructor(
    @Inject('action') private action,
    private followPlanService: FollowPlanService,
    private followPlanTableService: FollowPlanTableService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followPlanService.followPlanDetailConfig();
    this.planDetailTable = new TableOption({
      titles: this.followPlanTableService.setDetailTitles(),
      ifPage: true
    });
    this.getPlanDetail();
    /*this.followPlan.subscribe(data => {
      console.log(typeof data);
      if (data && data.fbDataDtoList) {
        let feedbackList = data.feedbacks;
        feedbackList.forEach(obj => {
          if (obj.isFlup == true) {
            obj.isFlup = '已反馈';
          } else {
            obj.isFlup = '';
          }
        });
        this.data = data;
        this.planDetailList = data.feedbacks
      }
    });*/
  }

  getPlanDetail(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.followPlanService.getPlanDetail(id).subscribe(
      data => {
        console.log(typeof data);
        console.log(data);
        if (data && data.data.fbDataDtoList) {
          let feedbackList = data.data.fbDataDtoList;
          feedbackList.forEach(obj => {
            if (obj.isFlup == '已反馈') {
              obj.isFlup = '已反馈';
            } else {
              obj.isFlup = '未反馈';
            }
          });
          this.planDate=new Date(data.data.fbDataDtoList[0].followUpDate).toLocaleDateString();
          this.date=new Date(data.data.fbDataDtoList[1].followUpDate).toLocaleDateString();
          this.data = data.data;
          this.planDetailList = data.data.fbDataDtoList;
        }
      }
    );
  }
}
