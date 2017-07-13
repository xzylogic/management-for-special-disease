import { Component, OnInit } from '@angular/core';
import { AssessmentRiskService } from './_service/assessment-risk.service';
import { AssessmentRiskTableService } from './_service/assessment-risk-table.service';

@Component({
  selector: 'app-assessment-risk',
  templateUrl: './assessment-risk.component.html'
})
export class AssessmentRiskComponent implements OnInit {
  // title = '服务号管理';
  // subTitle = '风险评估结果';
  //
  // assessmentRiskTable: TableOption;
  //
  // assessmentRisk: any;
  // enableDetail: boolean;
  // queryKey: string = '';
  // queryBind: number | string = '' ;

  constructor(
    private _assessmentRiskService: AssessmentRiskService,
    private _assessmentRiskTableService: AssessmentRiskTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // ngAfterViewInit() {
  // $('#list').dropdown();
  // }

  // refresh() {
  //   this.assessmentRiskTable = new TableOption();
  //   this.getAssessmentRiskTitles();
  //   this.getAssessmentRisks(0);
  // }
  //
  //  reset() {
  //   this.queryKey = '';
  //   this.queryBind = '';
  //   $('.text').text('筛选风险评估结果');
  //   $('.text').addClass('default');
  //   this.getAssessmentRisks(0);
  // }
  //
  // getAssessmentRiskTitles() {
  //   this.assessmentRiskTable.titles = this._assessmentRiskTableService.setTitles();
  // }
  //
  // getAssessmentRisks(page: number) {
  //   this.assessmentRiskTable.currentPage = page;
  //   this._assessmentRiskService.getAssessmentServices(this.queryKey,this.queryBind,this.assessmentRiskTable.size, page)
  //   .subscribe(
  //       data => {
  //         this.assessmentRiskTable.loading = false;
  //         if (data.data && data.data.content && data.data.length === 0 && data.code === 0) {
  //           this.assessmentRiskTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.formatUser(data.data.content);
  //           this.assessmentRiskTable.lists = data.data.content;
  //           this.assessmentRiskTable.totalPage = data.data.totalPages;
  //         } else {
  //           this.assessmentRiskTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.assessmentRiskTable.loading = false;
  //         this.assessmentRiskTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // formatUser(list: Array < any > ) {
  //   list.forEach(data => {
  //     if (data.sex === "Female") {
  //       data.sexName = '女';
  //     }
  //     if (data.sex === "Male") {
  //       data.sexName = '男';
  //     }
  //   })
  // }
  //
  // gotoHandle(data) {
  //   if (data.key === 'show') {
  //     this.assessmentRisk = data.value;
  //     this.enableDetail = true;
  //   }
  // }
}
