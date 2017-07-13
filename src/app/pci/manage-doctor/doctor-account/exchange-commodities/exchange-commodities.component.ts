import { Component, OnInit } from '@angular/core';

import { DoctorAccountService } from '../_service/doctor-account.service';
import { DoctorAccountTableService } from '../_service/doctor-account-table.service';

@Component({
  selector: 'app-exchange-commodities',
  template: `
    <h1>exchange-commodities</h1>
  `
})
export class ExchangeCommoditiesComponent implements OnInit {
  // modalTitle: string = '已兑换';
  // exchangeCommoditiesTable: TableOption = new TableOption();
  //
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService
  ) {
  }

  ngOnInit() {
    // this.getExchangeCommoditiesTitles();
    // if (this.data) {
    //   this.getExchangeCommodities(0);
    // } else {
    //   this.exchangeCommoditiesTable.errorMessage = "空空如也～";
    // }
  }

  // refresh() {
  //   if (this.data) {
  //     this.exchangeCommoditiesTable.loading = true;
  //     this.getExchangeCommodities(0);
  //   } else {
  //     this.exchangeCommoditiesTable.errorMessage = "空空如也～";
  //   }
  // }
  //
  // getExchangeCommoditiesTitles() {
  //   this.exchangeCommoditiesTable.titles = this._doctorAccountTableService.setExchangeDetailTitles();
  // }
  //
  // getExchangeCommodities(page: number) {
  //   this.exchangeCommoditiesTable.currentPage = page;
  //   this._doctorAccountService.getExchangeList(this.data.id, page, this.exchangeCommoditiesTable.size)
  //     .subscribe(
  //       data => {
  //         this.exchangeCommoditiesTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.exchangeCommoditiesTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.exchangeCommoditiesTable.totalPage = data.data.totalPages;
  //           this.exchangeCommoditiesTable.lists = data.data.content;
  //         }
  //       }, err => {
  //         this.exchangeCommoditiesTable.loading = false;
  //         this.exchangeCommoditiesTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
