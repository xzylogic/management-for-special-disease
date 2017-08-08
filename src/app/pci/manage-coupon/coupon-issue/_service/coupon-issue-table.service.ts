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
        key: 'userName',
      }),
      new TableTitle({
        name: '手机号',
        key: 'userTel',
      }),
      new TableTitle({
        name: '优惠券名称',
        key: 'couponName',
      }),
      new TableTitle({
        name: '时间',
        key: 'receiveTime'
      })
    ];

    return Titles;
  }
}
