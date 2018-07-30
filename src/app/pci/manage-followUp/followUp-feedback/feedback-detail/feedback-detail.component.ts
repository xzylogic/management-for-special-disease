import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { FollowFeedbackService } from '../_service/followUp-feedback.service';
import { FollowFeedbackTableService } from '../_service/followUp-feedback-table.service';
import { FollowFeedback } from '../_entity/followUp-feedback.entity';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  feedbackDetailTable: TableOption;
  feedbackDetailList: any;
  data: any;
  @select(['followFeedback', 'data']) followFeedback: Observable<FollowFeedback>;

  constructor(
    @Inject('action') private action,
    private followFeedbackService: FollowFeedbackService,
    private followFeedbackTableService: FollowFeedbackTableService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followFeedbackService.followFeedbackDetailConfig();
    this.feedbackDetailTable = new TableOption({
      titles: this.followFeedbackTableService.setDetailTitles(),
      ifPage: true
    });
    this.getfeedbackDetail();
    // this.followFeedback.subscribe(data => {
    //   if (data && data.feedbacks) {
    //     let feedbackList = data.feedbacks;
    //     feedbackList.forEach(obj => {
    //       if (obj.isFlup == true) {
    //         obj.isFlup = '已反馈';
    //       } else {
    //         obj.isFlup = '';
    //       }
    //     });
    //     this.data = data;
    //     this.feedbackDetailList = data.feedbacks
    //   }
    // });
  }
  getfeedbackDetail(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.followFeedbackService.getfeedbackDetail(id).subscribe(
      data => {
        // console.log(typeof data);
        if (data && data.data.fbDataDtoList) {
          let feedbackList = data.data.fbDataDtoList;
          feedbackList.forEach(obj => {
            if (obj.isFlup == '已反馈') {
              obj.isFlup = '已反馈';
            } else {
              obj.isFlup = '未反馈';
            }
            // if (obj.isFlup == true) {
            //   obj.isFlup = '已反馈';
            // } else {
            //   obj.isFlup = '';
            // }
          });
          this.data = data.data;
          this.feedbackDetailList = data.data.fbDataDtoList
        }
      }
    );
  }
}
