import { Component, OnInit } from '@angular/core';

import { FamilyAccountService } from './_service/family-account.service';
import { FamilyAccountTableService } from './_service/family-account-table.service';

@Component({
  selector: 'app-family-account',
  templateUrl: 'family-account.component.html'
})
export class FamilyAccountComponent implements OnInit {
  // title = '家庭账号维护';
  // subTitle = '家庭账号列表';
  //
  // familyAccountTable: TableOption;
  //
  // queryKey: string = '';

  constructor(
    private _familyAccountService: FamilyAccountService,
    private _familyAccountTableService: FamilyAccountTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh() {
  //   this.getFamilyAccounts(0);
  // }
  //
  // reset() {
  //   this.queryKey = '';
  //   this.getFamilyAccounts(0);
  // }
  //
  // getFamilyAccountTitles() {
  //   this.familyAccountTable.titles = this._familyAccountTableService.setTitles();
  // }
  //
  // getFamilyAccounts(page: number) {
  //   this.familyAccountTable = new TableOption();
  //   this.getFamilyAccountTitles();
  //   this.familyAccountTable.currentPage = page;
  //   this._familyAccountService.getFamilyAccounts(this.queryKey, page, this.familyAccountTable.size)
  //     .subscribe(
  //       data => {
  //         this.familyAccountTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.familyAccountTable.errorMessage = "当前数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.familyAccountTable.totalPage = data.data.totalPages;
  //           this.familyAccountTable.lists = data.data.content;
  //         } else {
  //           this.familyAccountTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.familyAccountTable.loading = false;
  //         this.familyAccountTable.errorMessage = "啊哦！接口访问出错啦～";
  //       });
  // }
}
