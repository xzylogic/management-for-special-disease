import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { HealthOrganizationService } from './_service/health-organization.service';
import { HealthOrganizationTableService } from './_service/health-organization-table.service';

@Component({
  selector: 'app-health-organization',
  templateUrl: './health-organization.component.html'
})
export class HealthOrganizationComponent implements OnInit {

  // healthOrganizationTable: TableOption = new TableOption();

  constructor(
    private _healthOrganizationService: HealthOrganizationService,
    private _healthOrganizationTableService: HealthOrganizationTableService
  ) {
  }

  ngOnInit() {
    // this.getHealthOrganizationTitles();
    // this.getHealthOrganizations();
  }

  refresh() {
    // this.getHealthOrganizations();
  }

  // getHealthOrganizationTitles() {
  //   this.healthOrganizationTable.titles = this._healthOrganizationTableService.setTitles();
  // }
  //
  // getHealthOrganizations() {
  //   this._healthOrganizationService.getHealthOrganizations()
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.healthOrganizationTable.lists = data.data;
  //         }
  //       }
  //     )
  // }
  // //编辑机构
  // gotoHandle(data) {
  //   this.organization = data;
  //   this.enableEdit = true;
  // }
  // //新增机构
  // newHealthOrganization() {
  //   this.organization = null;
  //   this.enableEdit = true;
  // }
  // //返回服务器信息
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
