import { Component, OnInit } from '@angular/core';
import { UserOrderService } from './_service/user-order.service';
import { UserOrderTableService } from './_service/user-order-table.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html'
})
export class UserOrderComponent implements OnInit {
  // title = '患者订单管理';
  // subTitle = '患者订单列表';
  //
  // userOrderTable: TableOption;
  // userOrderRefundTable: TableOption;
  // userOrderServicingTable: TableOption;
  // userOrderThirdTable: TableOption;
  //
  // refundCount: number;
  // thirdCount: number;
  //
  // userOrder: any;
  // enableRecord: boolean;
  // enableRefund: boolean;
  // enableProcess: boolean;
  //
  // titleShow: string = '提示信息';
  // message: string;
  // enableShow: boolean;

  constructor(
    private _userOrderService: UserOrderService,
    private _userOrderTableService: UserOrderTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
  }

  // refresh() {
  //   this.userOrderTable = new TableOption();
  //   this.userOrderRefundTable = new TableOption();
  //   this.userOrderServicingTable = new TableOption();
  //   this.userOrderThirdTable = new TableOption();
  //   this.getUserOrderTitles();
  //   this.getUserOrderRefundTitles();
  //   this.getUserOrderServicingTitles();
  //   this.getUserOrderThirdTitles();
  //   this.getUserOrders(0);
  //   this.getUserRefundOrders(0);
  //   this.getUserServicingOrders(0);
  //   this.getUserThirdOrders(0);
  //   this.getUserOrderCount();
  // }
  //
  // getUserOrderCount() {
  //   this._userOrderService.getUserOrderCount()
  //     .subscribe(
  //       data => {
  //         if (data.data && data.code === 0) {
  //           this._sidebarService.setCount(data.data.refundSum + data.data.thirdSum, 'usergroup', 'userorder');
  //         }
  //       })
  // }
  //
  // getUserOrderTitles() {
  //   this.userOrderTable.titles = this._userOrderTableService.setTitles();
  // }
  //
  // getUserOrderRefundTitles() {
  //   this.userOrderRefundTable.titles = this._userOrderTableService.setRefundTitles();
  // }
  //
  // getUserOrderServicingTitles() {
  //   this.userOrderServicingTable.titles = this._userOrderTableService.setServicingTitles();
  // }
  //
  // getUserOrderThirdTitles() {
  //   this.userOrderThirdTable.titles = this._userOrderTableService.setThirdTitles();
  // }
  //
  // getUserOrders(page: number) {
  //   this.userOrderTable.currentPage = page;
  //   this._userOrderService.getUserOrders(page, this.userOrderTable.size)
  //     .subscribe(
  //       data => {
  //         this.userOrderTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.userOrderTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.userOrderTable.totalPage = data.data.totalPages;
  //           this.userOrderTable.lists = data.data.content;
  //         } else {
  //           this.userOrderTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.userOrderTable.loading = false;
  //         this.userOrderTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getUserRefundOrders(page: number) {
  //   this.userOrderRefundTable.currentPage = page;
  //   this._userOrderService.getUserOrderRefunds(page, this.userOrderRefundTable.size)
  //     .subscribe(
  //       data => {
  //         this.userOrderRefundTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.userOrderRefundTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.userOrderRefundTable.totalPage = data.data.totalPages;
  //           this.userOrderRefundTable.lists = data.data.content;
  //           this.refundCount = data.data.totalElements;
  //         } else {
  //           this.userOrderRefundTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.userOrderRefundTable.loading = false;
  //         this.userOrderRefundTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getUserServicingOrders(page: number) {
  //   this.userOrderServicingTable.currentPage = page;
  //   this._userOrderService.getUserOrderServicings(page, this.userOrderServicingTable.size)
  //     .subscribe(
  //       data => {
  //         this.userOrderServicingTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.userOrderServicingTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.userOrderServicingTable.totalPage = data.data.totalPages;
  //           this.userOrderServicingTable.lists = data.data.content;
  //         } else {
  //           this.userOrderServicingTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.userOrderServicingTable.loading = false;
  //         this.userOrderServicingTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // getUserThirdOrders(page: number) {
  //   this.userOrderThirdTable.currentPage = page;
  //   this._userOrderService.getUserOrderThirds(page, this.userOrderThirdTable.size)
  //     .subscribe(
  //       data => {
  //         this.userOrderThirdTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.userOrderThirdTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //           this.userOrderThirdTable.totalPage = data.data.totalPages;
  //           this.userOrderThirdTable.lists = data.data.content;
  //           this.thirdCount = data.data.totalElements;
  //         } else {
  //           this.userOrderThirdTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.userOrderThirdTable.loading = false;
  //         this.userOrderThirdTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  //
  // gotoHandle(data) {
  //   this.userOrder = data.value;
  //   if (data.key === 'usage') {
  //     this.enableRecord = true;
  //   } else if (data.key === 'refund') {
  //     this.enableRefund = true;
  //
  //   } else if (data.key === 'thirdProcess') {
  //     this.enableProcess = true;
  //   }
  // }
  //
  // processRefund() {
  //   this._userOrderService.userOrderRefund(this.userOrder.id)
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.message = '操作成功！';
  //           this.enableShow = true;
  //           this.refresh();
  //           this.refundCancel();
  //         } else {
  //           if (data.msg) {
  //             this.message = data.msg;
  //           } else {
  //             this.message = '操作失败！';
  //           }
  //           this.enableShow = true;
  //           this.refundCancel();
  //         }
  //       }, err => {
  //         this.message = '接口访问出错！';
  //         this.enableShow = true;
  //         this.refundCancel();
  //       })
  // }
  //
  // refundCancel() {
  //   this.userOrder = null;
  //   this.enableRefund = false;
  // }
  //
  // processThird() {
  //   this._userOrderService.userOrderProcess(this.userOrder.id)
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.message = '操作成功！';
  //           this.enableShow = true;
  //           this.refresh();
  //           this.processCancel();
  //         } else {
  //           if (data.msg) {
  //             this.message = data.msg;
  //           } else {
  //             this.message = '操作失败！';
  //           }
  //           this.enableShow = true;
  //           this.processCancel();
  //         }
  //       }, err => {
  //         this.message = '接口访问出错！';
  //         this.enableShow = true;
  //         this.processCancel();
  //       })
  // }
  //
  // processCancel() {
  //   this.userOrder = null;
  //   this.enableProcess = false;
  // }
}
