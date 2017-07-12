import { Component, OnInit, Inject } from '@angular/core';

import { TableOption } from '../../../entities';

import { IntegralOrderService, IntegralOrderTableService } from './_service';
import { SidebarService } from "../../_services/sidebar.service";

declare var $: any;

@Component({
  selector: 'integral-order',
  templateUrl: 'integral-order.component.html'
})
export class IntegralOrderComponent implements OnInit {
    title = '积分管理';
    subTitle = '积分商品订单管理';

    IntegralOrderTable: TableOption;
    IntegralOrderedTable: TableOption;

    integralOrderCount: number;

    integralOrder: any;
    integralOrdered: any;

    enableMessage: boolean;

    titleShow: string = '提示信息';
    message: string;
    enableShow: boolean;

    integralExpressList: any;
    expressName: any;
    express: string = '';

    goodsName: string;
    expressNumber: string = '';
    operator: string;
    msg: string;
    opt: string;
    courierId: number;
    processStatus: number;
    editTitle: string;
    msgTitle: string = "请填写以下信息：";

    constructor(
      @Inject('admin') private admin,
      private _integralOrderService: IntegralOrderService,
      private _integralOrderTableService: IntegralOrderTableService,
      private _sidebarService: SidebarService
  ) {}

     ngOnInit() {
        this.refresh();
  }

  refresh() {
    this.IntegralOrderTable = new TableOption();
    this.IntegralOrderedTable = new TableOption();
    this.getIntegralOrderTitles();
    this.getIntegralOrderedTitles();
    this.getIntegralOrders(0);
    this.getIntegralOrdereds(0);
    this.getCount();
  }

  getIntegralOrderTitles() {
    this.IntegralOrderTable.titles = this._integralOrderTableService.setDealTitles();
  }

  getIntegralOrderedTitles() {
    this.IntegralOrderedTable.titles = this._integralOrderTableService.setDealedTitles();
  }

  getIntegralOrders(page: number) {
    this.IntegralOrderTable.currentPage = page;
    let option: any = { flag: page, idx: 0 };
    this._integralOrderService.getIntegralOrder(option)
      .subscribe(
        data => {
          this.IntegralOrderTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.IntegralOrderTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.IntegralOrderTable.totalPage = data.data.totalPages;
            this.IntegralOrderTable.lists = data.data.content;
            this.operator = data.data.content.operator;
            this.goodsName = data.data.content.title;
          } else {
            this.IntegralOrderTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.IntegralOrderTable.loading = false;
          this.IntegralOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getIntegralOrdereds(page: number) {
    this.IntegralOrderedTable.currentPage = page;
    let option: any = { flag: page, idx: 1 };
    this._integralOrderService.getIntegralOrder(option)
      .subscribe(
        data =>{
            // console.log(data);
          this.IntegralOrderedTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.IntegralOrderedTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.IntegralOrderedTable.totalPage = data.data.totalPages;
            this.IntegralOrderedTable.lists = data.data.content;
            // console.log(data.data.content);
          } else {
            this.IntegralOrderedTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.IntegralOrderedTable.loading = false;
          this.IntegralOrderedTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  getCount() {
    this._integralOrderService.getIntegralOrderCount()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.integralOrderCount = data.data;
            this._sidebarService.setCount(this.integralOrderCount, 'integral', 'integralOrder');
          }
        })
  }

  gotoHandle(data) {
    this.processStatus = data.value.processStatus;
    if(this.processStatus == 0){
      this.integralOrder = data.value;
    }else{
      this.integralOrdered = data.value;
    }

    $('#integralExpressList').dropdown();
   if (data.key === 'sendMessage') {
      if (data.value.processStatus === 0) {
        this.enableMessage = true;
        this.editTitle = "发送短信";
        this.expressComponyList()
        .subscribe(
        () => {

        }, err => {
          this.IntegralOrderTable.errorMessage = "啊哦！接口访问出错啦～";
        })
        this.goodsName = data.value.title;
      }
    } else if (data.key === 'editNumber') {
        if (data.value.processStatus === 1) {
        this.enableMessage = true;
        this.editTitle = "编辑单号";
        $('#integralExpressList').dropdown();
        this.expressComponyList()
        .subscribe(
        () => {

        }, err => {
          this.IntegralOrderedTable.errorMessage = "啊哦！接口访问出错啦～";
        })
      }
    }
  }

  setMsg(){
      this.msg = "您兑换" + this.goodsName + "已发货，快递为" + this.express + "，单号为" + this.expressNumber + "，请注意查收，如有问题，请联系客服400-112-1881";
  }

  expressComponyList(){
      return this._integralOrderService.getExpressList()
      .map(
          data =>{
              if (data.data && data.code == 0 ){
                  this.integralExpressList = data.data;
                  this.expressName = data.data[0];
              }
          })
  }

  expressNoEdit(data) {
    let body: any;
    if(this.processStatus == 0){
     body = {
      exchangeId: this.integralOrder.id,
      courierId: data.expressName,
      trackingNum: data.expressNumber,
      msg: this.msg,
      operator: this.admin.getName()
    };
    }else{
        body = {
        exchangeId: this.integralOrdered.id,
        courierId: data.expressName,
        trackingNum: data.expressNumber,
        operator: this.admin.getName()
    };
    }
  //  console.log(body);
    this._integralOrderService.editExpressNo(body)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.message = "操作成功～";
            this.enableMessage = false;
            this.enableShow = true;
            this.expressName = '';
            this.expressNumber = '';
            this.msg = '';
            this.refresh();
          } else {
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "操作失败～";
            }
            this.enableMessage = false;
            this.enableShow = true;
          }
        }, err => {
          this.message = "连接服务器出错";
          this.enableMessage = false;
          this.enableShow = true;
        })
  }

  expressChange(express) {
    this.integralExpressList.forEach(element => {
      if(element.id == express) {
        this.express = element.name;
      }
    });
    this.setMsg();
  }

  expressCancel() {
    this.integralOrder = null;
    this.integralOrdered = null;
    this.enableMessage = false;
  }
}
