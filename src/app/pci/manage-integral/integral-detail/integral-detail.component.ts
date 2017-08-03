import { Component, Inject, Input, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';
import { ContainerConfig } from '../../../libs/';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { IntegralDetail } from './_entity/integralDetail.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-integral-detail',
  templateUrl: 'integral-detail.component.html'
})
export class IntegralDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  integralDetailUserTable: TableOption;
  integralDetailDoctorTable: TableOption;
  @select(['integralDetail', 'tab']) tab: Observable<number>;
  @select(['integralDetail', 'page']) page: Observable<Array<number>>;


  constructor(
    @Inject('action') private action,
    private integralDetailService: IntegralDetailService,
    private integralDetailTableService: IntegralDetailTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('integralDetail', new IntegralDetail());
  }

  ngOnInit() {
    this.containerConfig = this.integralDetailService.integralDetailConfig();
    this.integralDetailUserTable = new TableOption({
      titles: this.integralDetailTableService.setTitles(),
      ifPage: true
    });
    this.integralDetailDoctorTable = new TableOption({
      titles: this.integralDetailTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.integralDetailUserTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralDetailUsers(page[0]);
    });
  }

  reset1() {
    this.integralDetailDoctorTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralDetailDoctors(page[0]);
    });
  }

  getIntegralDetailUsers(page: number) {
    this.action.pageChange('integralDetail', [page, this.integralDetailDoctorTable.currentPage]);
    this.integralDetailUserTable.reset(page);
    const option: any = {flag: page, type: 0};
    if (this.integralDetailUserTable.queryKey) {
      option.param = this.integralDetailUserTable.queryKey;
    }
    this.integralDetailService.getIntegralDetail(option)
      .subscribe(res => {
        this.integralDetailUserTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralDetailUserTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralDetailUserTable.totalPage = res.data.totalPages;
          this.integralDetailUserTable.lists = res.data.content;
        } else {
          this.integralDetailUserTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralDetailUserTable.loading = false;
        console.log(err);
        this.integralDetailUserTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getIntegralDetailDoctors(page: number) {
    this.action.pageChange('integralDetail', [this.integralDetailUserTable.currentPage, page]);
    this.integralDetailDoctorTable.reset(page);
    const option: any = {flag: page, type: 1};
    if (this.integralDetailDoctorTable.queryKey) {
      option.param = this.integralDetailDoctorTable.queryKey;
    }
    this.integralDetailService.getIntegralDetail(option)
      .subscribe(res => {
        this.integralDetailDoctorTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralDetailDoctorTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralDetailDoctorTable.totalPage = res.data.totalPages;
          this.integralDetailDoctorTable.lists = res.data.content;
        } else {
          this.integralDetailDoctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralDetailDoctorTable.loading = false;
        console.log(err);
        this.integralDetailDoctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  change(index) {
    this.action.tabChange('integralDetail', index);
  }
}
