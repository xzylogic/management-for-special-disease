import { Component, OnInit } from '@angular/core';

import { ContainerConfig, TableOption } from '../../../libs';
import { AssessmentRiskService } from './_service/assessment-risk.service';
import { AssessmentRiskTableService } from './_service/assessment-risk-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-assessment-risk',
  templateUrl: './assessment-risk.component.html'
})
export class AssessmentRiskComponent implements OnInit {
  containerConfig: ContainerConfig;
  assessmentRiskTable: TableOption;
  queryResult: any;

  constructor(
    private assessmentRiskService: AssessmentRiskService,
    private assessmentRiskTableService: AssessmentRiskTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.assessmentRiskService.assessmentRiskConfig();
    this.assessmentRiskTable = new TableOption({
      titles: this.assessmentRiskTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.assessmentRiskTable.queryKey = '';
    this.getAssessmentRisks(0);
  }

  getAssessmentRisks(page: number) {
    this.assessmentRiskTable.reset(page);
    this.assessmentRiskService.getAssessmentServices(this.assessmentRiskTable.queryKey, this.queryResult, this.assessmentRiskTable.size, page)
      .subscribe(res => {
        this.assessmentRiskTable.loading = false;
        if (res.data && res.data.content && res.data.length === 0 && res.code === 0) {
          this.assessmentRiskTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.data.content && res.code === 0) {
          this.formatUser(res.data.content);
          this.assessmentRiskTable.lists = res.data.content;
          this.assessmentRiskTable.totalPage = res.data.totalPages;
        } else {
          this.assessmentRiskTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.assessmentRiskTable.loading = false;
        console.log(err);
        this.assessmentRiskTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  formatUser(list: Array<any>) {
    list.forEach(data => {
      if (data.sex === 'Female') {
        data.sexName = '女';
      }
      if (data.sex === 'Male') {
        data.sexName = '男';
      }
    })
  }

  gotoHandle(res) {
    console.log(res)
    if (res.key === 'show') {
      // this.assessmentRisk = data.value;
      // this.enableDetail = true;
    }
  }
}
