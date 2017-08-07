import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../libs';

@Injectable()
export class CouponIssueTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '用户名',
        key: 'user',
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
      }),
      new TableTitle({
        name: '优惠券名称',
        key: 'coupon',
      }),
      new TableTitle({
        name: '时间',
        key: 'receiveTime'
      })
    ];

    return Titles;
  }
}
