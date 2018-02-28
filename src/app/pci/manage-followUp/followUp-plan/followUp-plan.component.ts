import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
// import { ImageDialog } from '../../../libs/dmodal/dialog-img.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FollowPlanService } from './_service/followUp-plan.service';
import { FollowPlanTableService } from './_service/followUp-plan-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-follow-plan',
  templateUrl: './followUp-plan.component.html'
})
export class FollowPlanComponent implements OnInit {

  containerConfig: ContainerConfig;
  followPlanTable: TableOption;
  createdDate: any;
  option = {
    start: 0,
    end: 0
  };

  @select(['followPlan', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    // @Inject('nav') private navService,
    @Inject('search') private search,
    private followPlanService: FollowPlanService,
    private followPlanTableService: FollowPlanTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followPlanService.followPlanConfig();
    this.followPlanTable = new TableOption({
      titles: this.followPlanTableService.setTitles(),
      ifPage: true
    });
    // this.createdDate = this.search.setDefaultRange();
    this.reset();
  }

  reset() {
    this.followPlanTable.queryKey = '';
    this.createdDate = '';
    this.page.subscribe((page: Array<number>) => {
      this.getFollowList(page[0]);
    });
  }

  getFollowList(page: number) {
    if (this.createdDate) {
      const option = this.search.getStartAndEnd(this.createdDate);
      this.option = option;
    } else {
      this.option = {
        start: 0,
        end: 0
      };
    }
    this.action.pageChange('medication',
      [page]);
    this.followPlanTable.reset(page);
    this.followPlanService.getData(page, this.followPlanTable.size, this.followPlanTable.queryKey, this.option.start, this.option.end)
      .subscribe(
        res => {
          this.followPlanTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.followPlanTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.followPlanTable.totalPage = res.data.totalPages;
            this.followPlanTable.lists = res.data.content;
          } else {
            this.followPlanTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.followPlanTable.loading = false;
          console.log(err);
          this.followPlanTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  gotoHandle(res) {
    console.log(res)
    if (res.key === 'idCardImageUrl') {

    }
  }

}
