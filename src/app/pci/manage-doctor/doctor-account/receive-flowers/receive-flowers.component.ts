import { Component, OnInit } from '@angular/core';

import { DoctorAccountService } from '../_service/doctor-account.service';
import { DoctorAccountTableService } from '../_service/doctor-account-table.service';

@Component({
  selector: 'app-receive-flowers',
  template: `
    <h1>app-receive-flowers</h1>
  `
})
export class ReceiveFlowersComponent implements OnInit {
  // modalTitle: string = '收到鲜花';
  // receiveFlowersTable: TableOption = new TableOption();
  //
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private doctorAccountService: DoctorAccountService,
    private doctorAccountTableService: DoctorAccountTableService
  ) {
  }

  ngOnInit() {
    // this.getReceiveFlowersTitles();
    // if (this.data) {
    //   this.getReceiveFlowers(0);
    // } else {
    //   this.receiveFlowersTable.errorMessage = "空空如也～";
    // }
  }

  // refresh() {
  //   if (this.data) {
  //     this.receiveFlowersTable.loading = true;
  //     this.getReceiveFlowers(0);
  //   } else {
  //     this.receiveFlowersTable.errorMessage = "空空如也～";
  //   }
  // }
  //
  // getReceiveFlowersTitles() {
  //   this.receiveFlowersTable.titles = this._doctorAccountTableService.setIncomeDetailTitles();
  // }
  //
  // getReceiveFlowers(page: number) {
  //   this.receiveFlowersTable.currentPage = page;
  //   this._doctorAccountService.getDetailList(this.data.id, page, this.receiveFlowersTable.size)
  //     .subscribe(
  //       data => {
  //         this.receiveFlowersTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.receiveFlowersTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.receiveFlowersTable.totalPage = data.data.totalPages;
  //           this.receiveFlowersTable.lists = data.data.content;
  //         }
  //       }, err => {
  //         this.receiveFlowersTable.loading = false;
  //         this.receiveFlowersTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
