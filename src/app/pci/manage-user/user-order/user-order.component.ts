import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';


import { UserOrderService } from './_service/user-order.service';
import { UserOrderTableService } from './_service/user-order-table.service';
import { UserOrder } from './_entity/user-order.entity';
import {
  TableOption, ContainerConfig, DialogOptions,
  ImageDialog, ActionDialog, HintDialog, MessageDialog
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html'
})
export class UserOrderComponent implements OnInit {
  containerConfig: ContainerConfig;
  userOrderTable: TableOption;
  userOrderRefundTable: TableOption;
  userOrderServicingTable: TableOption;
  userOrderThirdTable: TableOption;
  @select(['userOrder', 'tab']) tab: Observable<number>;
  @select(['userOrder', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private userOrderService: UserOrderService,
    private userOrderTableService: UserOrderTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('userOrder', new UserOrder());
  }

  ngOnInit() {
    this.containerConfig = this.userOrderService.userOrderConfig();
    this.userOrderTable = new TableOption({
      titles: this.userOrderTableService.setTitles(),
      ifPage: true
    });
    this.userOrderRefundTable = new TableOption({
      titles: this.userOrderTableService.setRefundTitles(),
      ifPage: true
    });
    this.userOrderServicingTable = new TableOption({
      titles: this.userOrderTableService.setServicingTitles(),
      ifPage: true
    });
    this.userOrderThirdTable = new TableOption({
      titles: this.userOrderTableService.setThirdTitles(),
      ifPage: true
    });
    this.refresh();
  }

  refresh() {
    this.getUserOrders(0);
    this.getUserRefundOrders(0);
    this.getUserServicingOrders(0);
    this.getUserThirdOrders(0);
    // this.getUserOrderCount();
  }

  getUserOrders(page: number) {
    this.action.pageChange('user-order', [page, this.userOrderRefundTable.currentPage, this.userOrderServicingTable.currentPage, this.userOrderThirdTable.currentPage]);
    this.userOrderTable.reset(page);
    this.userOrderService.getUserOrders(page, this.userOrderTable.size)
      .subscribe(
        data => {
          this.userOrderTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderTable.totalPage = data.data.totalPages;
            this.userOrderTable.lists = data.data.content;
          } else {
            this.userOrderTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderTable.errorMessage = ERRMSG.nullMsg;
        })
  }
  //
  getUserRefundOrders(page: number) {
    this.action.pageChange('user-order', [page, this.userOrderTable.currentPage, this.userOrderServicingTable.currentPage, this.userOrderThirdTable.currentPage]);
    this.userOrderRefundTable.reset(page);
    this.userOrderService.getUserOrderRefunds(page, this.userOrderRefundTable.size)
      .subscribe(
        data => {
          this.userOrderRefundTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderRefundTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderRefundTable.totalPage = data.data.totalPages;
            this.userOrderRefundTable.lists = data.data.content;
            // this.refundCount = data.data.totalElements;
          } else {
            this.userOrderRefundTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderRefundTable.errorMessage = ERRMSG.nullMsg;
        })
  }

  getUserServicingOrders(page: number) {
    this.action.pageChange('user-order', [page, this.userOrderTable.currentPage, this.userOrderRefundTable.currentPage, this.userOrderThirdTable.currentPage]);
    this.userOrderServicingTable.reset(page);
    this.userOrderService.getUserOrderServicings(page, this.userOrderServicingTable.size)
      .subscribe(
        data => {
          this.userOrderServicingTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderServicingTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderServicingTable.totalPage = data.data.totalPages;
            this.userOrderServicingTable.lists = data.data.content;
          } else {
            this.userOrderServicingTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderServicingTable.errorMessage = ERRMSG.nullMsg;
        })
  }

  getUserThirdOrders(page: number) {
    this.action.pageChange('user-order', [page, this.userOrderTable.currentPage, this.userOrderRefundTable.currentPage, this.userOrderServicingTable.currentPage]);
    this.userOrderThirdTable.reset(page);
    this.userOrderService.getUserOrderThirds(page, this.userOrderThirdTable.size)
      .subscribe(
        data => {
          this.userOrderThirdTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderThirdTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderThirdTable.totalPage = data.data.totalPages;
            this.userOrderThirdTable.lists = data.data.content;
            // this.thirdCount = data.data.totalElements;
          } else {
            this.userOrderThirdTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderThirdTable.errorMessage = ERRMSG.nullMsg;
        })
  }


  gotoHandle(res) {
    const order = <UserOrder>res.value;
    if (res.key === 'usage') {
      this.action.dataChange('userOrder', order);
      this.router.navigate(['/user-order/edit']);
    }
    if (res.key === 'refund') {
      const config = new DialogOptions({
        title: `您确定要退款${order.purchaser}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'topass') {
          this.toReimburse(order.id);
        }
      });
    }
    if (res.key === 'thirdProcess') {
      const config = new DialogOptions({
        title: `您确定要处理${order.purchaser}的服务？`,
        message: '',
        buttons: [{
          key: 'torefuse',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }],
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'torefuse') {
          this.getThrough(order.id);
        }
      });
    }
  }


  toReimburse(id) {
    this.userOrderService.userOrderRefund(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.refresh();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  getThrough(id) {
    this.userOrderService.userOrderProcess(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.refresh();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }



  change(index) {
    this.action.tabChange('userOrder', index);
  }
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
