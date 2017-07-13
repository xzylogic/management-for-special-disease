import { Component, OnInit } from '@angular/core';

import { DoctorAccountService } from './_service/doctor-account.service';
import { DoctorAccountTableService } from './_service/doctor-account-table.service';

@Component({
  selector: 'app-doctor-account',
  templateUrl: './doctor-account.component.html'
})
export class DoctorAccountComponent implements OnInit {
  // title = '医生账户管理';
  // subTitle = '医生账户列表';
  //
  // doctorAccountTable: TableOption;
  // withdrawDepositTable: TableOption;
  // commodityExchangeTable: TableOption;
  //
  // withdrawDepositCount: number;
  // commodityExchangeCount: number;
  //
  // doctorAccount: any;
  // enableExchangeDetail: boolean;
  // enableReceiveDetail: boolean;
  // enablePay: boolean;
  // enableExpress: boolean;
  // enableReach: boolean;
  //
  // titleShow: string = '提示信息';
  // message: string;
  // enableShow: boolean;

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh() {
  //   this.doctorAccountTable = new TableOption();
  //   this.withdrawDepositTable = new TableOption();
  //   this.commodityExchangeTable = new TableOption();
  //   this.getDoctorAccountTitles();
  //   this.getWithdrawDepositTitles();
  //   this.getCommodityExchangeTitles();
  //   this.getDoctorAccounts(0);
  //   this.getWithdrawDeposits(0);
  //   this.getCommodityExchanges(0);
  //   this.getCount();
  // }
  //
  // getDoctorAccountTitles() {
  //   this.doctorAccountTable.titles = this._doctorAccountTableService.setDoctorAccountTitles();
  // }
  //
  // getWithdrawDepositTitles() {
  //   this.withdrawDepositTable.titles = this._doctorAccountTableService.setWithdrawDepositTitles();
  // }
  //
  // getCommodityExchangeTitles() {
  //   this.commodityExchangeTable.titles = this._doctorAccountTableService.setCommodityExchangeTitles();
  // }
  //
  // getDoctorAccounts(page: number) {
  //   this.doctorAccountTable.currentPage = page;
  //   this._doctorAccountService.getDoctorAccounts(page, this.doctorAccountTable.size)
  //     .subscribe(
  //       data => {
  //         this.doctorAccountTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.doctorAccountTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.doctorAccountTable.totalPage = data.data.totalPages;
  //           this.doctorAccountTable.lists = data.data.content;
  //         } else {
  //           this.doctorAccountTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.doctorAccountTable.loading = false;
  //         this.doctorAccountTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getWithdrawDeposits(page: number) {
  //   this.withdrawDepositTable.currentPage = page;
  //   this._doctorAccountService.getWithdrawDeposits(page, this.withdrawDepositTable.size)
  //     .subscribe(
  //       data => {
  //         this.withdrawDepositTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.withdrawDepositTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.withdrawDepositTable.totalPage = data.data.totalPages;
  //           this.withdrawDepositTable.lists = data.data.content;
  //         } else {
  //           this.withdrawDepositTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.withdrawDepositTable.loading = false;
  //         this.withdrawDepositTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getCommodityExchanges(page: number) {
  //   this.commodityExchangeTable.currentPage = page;
  //   this._doctorAccountService.getCommodityExchanges(page, this.commodityExchangeTable.size)
  //     .subscribe(
  //       data => {
  //         this.commodityExchangeTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.commodityExchangeTable.errorMessage = "该数据为空哦～";
  //         } else
  //         if (data.data && data.data.content && data.code === 0) {
  //           this.commodityExchangeTable.totalPage = data.data.totalPages;
  //           this.commodityExchangeTable.lists = data.data.content;
  //         } else {
  //           this.commodityExchangeTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.commodityExchangeTable.loading = false;
  //         this.commodityExchangeTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getCount() {
  //   this._doctorAccountService.getCount()
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.withdrawDepositCount = data.data.withdraw;
  //           this.commodityExchangeCount = data.data.purchase;
  //           this._sidebarService.setCount(this.withdrawDepositCount + this.commodityExchangeCount, 'doctorgroup', 'doctor');
  //         }
  //       })
  // }
  //
  // gotoHandle(data) {
  //   this.doctorAccount = data.value;
  //   if (data.key === 'totalRevenue') {
  //     this.enableReceiveDetail = true;
  //   } else if (data.key === 'totalExpenses') {
  //     this.enableExchangeDetail = true;
  //   } else if (data.key === 'pay') {
  //     if (data.value.status === 0) {
  //       this.enablePay = true;
  //     } else {
  //       this.message = '已提现成功！';
  //       this.enableShow = true;
  //     }
  //   } else if (data.key === 'editExpress') {
  //     if (data.value.status === 0) {
  //       this.enableExpress = true;
  //     } else {
  //       this.message = '已输入信息！';
  //       this.enableShow = true;
  //     }
  //   } else if (data.key === 'arrival') {
  //     if (data.value.status === 0) {
  //       this.message = '请先输入快递单号';
  //       this.enableShow = true;
  //     } else if (data.value.status === 1) {
  //       this.enableReach = true;
  //     } else {
  //       this.message = '已到货';
  //       this.enableShow = true;
  //     }
  //   }
  // }
  //
  // processPay() {
  //   this._doctorAccountService.getWithdraw(this.doctorAccount.id)
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.message = "操作成功～";
  //           this.enablePay = false;
  //           this.enableShow = true;
  //           this.refresh();
  //         } else {
  //           if (data.msg) {
  //             this.message = data.msg;
  //           } else {
  //             this.message = "操作失败～";
  //           }
  //           this.enablePay = false;
  //           this.enableShow = true;
  //         }
  //       }, err => {
  //         this.message = "连接服务器出错";
  //         this.enablePay = false;
  //         this.enableShow = true;
  //       })
  // }
  //
  // payCancel() {
  //   this.doctorAccount = null;
  //   this.enablePay = false;
  // }
  //
  // processExpress(data) {
  //   this.getPurchaseEdit(this.doctorAccount.id, data.expressNumber, data.expressCompany, 1);
  // }
  //
  // processReach() {
  //   this.getPurchaseEdit(this.doctorAccount.id, this.doctorAccount.expressNo, this.doctorAccount.expressCompany, 2);
  // }
  //
  // getPurchaseEdit(id, expressNumber, expressCompany, status) {
  //   this._doctorAccountService.getPurchase(
  //       id,
  //       expressNumber,
  //       expressCompany,
  //       status
  //     )
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.message = "操作成功～";
  //           this.enableExpress = false;
  //           this.enableReach = false;
  //           this.enableShow = true;
  //           this.refresh();
  //         } else {
  //           if (data.msg) {
  //             this.message = data.msg;
  //           } else {
  //             this.message = "操作失败～";
  //           }
  //           this.enableReach = false;
  //           this.enableExpress = false;
  //           this.enableShow = true;
  //         }
  //       }, err => {
  //         this.message = "连接服务器出错";
  //         this.enableReach = false;
  //         this.enableExpress = false;
  //         this.enableShow = true;
  //       })
  // }
  //
  // expressCancel() {
  //   this.doctorAccount = null;
  //   this.enableExpress = false;
  // }
  //
  // reachCancel() {
  //   this.doctorAccount = null;
  //   this.enableReach = false;
  // }
}
