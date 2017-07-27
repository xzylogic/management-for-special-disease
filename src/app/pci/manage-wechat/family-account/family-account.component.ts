import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { FamilyAccountService } from './_service/family-account.service';
import { FamilyAccountTableService } from './_service/family-account-table.service';
import {
  TableOption, ContainerConfig
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-family-account',
  templateUrl: 'family-account.component.html'
})
export class FamilyAccountComponent implements OnInit {
  containerConfig: ContainerConfig;
  familyAccountTable: TableOption;
  @select(['familyAccount', 'page']) page: Observable<Array<number>>;
  // title = '家庭账号维护';
  // subTitle = '家庭账号列表';
  //
  // familyAccountTable: TableOption;
  //
  // queryKey: string = '';

  constructor(
    private familyAccountService: FamilyAccountService,
    private familyAccountTableService: FamilyAccountTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.familyAccountService.familyAccountConfig();
    this.familyAccountTable = new TableOption({
      titles: this.familyAccountTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.familyAccountTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getFamilyAccounts(page[0]);
    });
  }

  getFamilyAccounts(page: number) {
    this.familyAccountTable.reset(page);
    this.familyAccountService.getFamilyAccounts(this.familyAccountTable.queryKey, page, this.familyAccountTable.size)
      .subscribe(
        res => {
          this.familyAccountTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.familyAccountTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.familyAccountTable.totalPage = res.data.totalPages;
            this.familyAccountTable.lists = res.data.content;
          } else {
            this.familyAccountTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.familyAccountTable.loading = false;
          this.familyAccountTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
}
