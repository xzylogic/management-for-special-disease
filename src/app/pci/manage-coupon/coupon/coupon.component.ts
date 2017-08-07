import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { CouponService } from './_service/coupon.service';
import { CouponTableService } from './_service/coupon-table.service';
import { Coupon } from './_entity/coupon.entity';
import {
  TableOption, ContainerConfig, ControlType, DialogOptions,
  ActionDialog, HintDialog
} from '../../../libs';
import { ERRMSG } from '../../_store/static';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  containerConfig: ContainerConfig;
  couponTable: TableOption;
  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    private couponService: CouponService,
    private couponTableService: CouponTableService,
    private dialog: MdDialog,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.couponService.couponConfig();
    this.couponTable = new TableOption({
      titles: this.couponTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getCouponList(0);
  }

  getCouponList(page: number) {
    this.couponService.getCouponList(
      page, this.couponTable.size)
      .subscribe(res => {
        this.couponTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.couponTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.couponTable.totalPage = res.data.totalPages;
          this.getStatus(res.data.content);
          this.couponTable.lists = res.data.content;
        } else {
          this.couponTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.couponTable.loading = false;
        console.log(err);
        this.couponTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  // 状态装换
  getStatus(list) {
    list.forEach(data => {
      if (data.status === 'Online') {
        data.statusName = '已上线'
      }
      if (data.status === '') {
        data.statusName = '已下架';
      }
      if (data.fullPrice && data.price) {
        data.couponPrice = `订单满${data.fullPrice}元，减${data.price}元`;
      } else {
        data.couponPrice = data.fullPrice;
      }
    })
  }

  newData() {
    this.action.dataChange('coupon', new Coupon());
    this.router.navigate(['/dc-list/edit']);
  }

  couponMaintain() {
    this.couponService.couponExplain()
      .subscribe(res => {
        if (res.code === 0) {
          this.getcouponExplain(res.data);
        }
      }, err => {
        alert(err);
      })
  }

  getcouponExplain(data) {
    const config = new DialogOptions({
      title: '优惠券说明维护',
      message: '',
      buttons: [{
        key: 'torefuse',
        value: '保存',
        color: 'primary'
      }, {
        key: 'tocancel',
        value: '取消',
        color: ''
      }],
      forms: [{
        key: 'message',
        label: '优惠券说明维护',
        value: data || '',
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'torefuse' && result.value[0]) {
        this.toRefuseCoupon(result.value[0].value);
      }
    });
  }

  gotoHandle(res) {
    const coupon = <Coupon>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('coupon', coupon);
      this.router.navigate(['/dc-list/edit']);
    }
  }

  toRefuseCoupon(value) {
    this.couponService.couponExplainUpdate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }
}
