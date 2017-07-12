import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class IntegralOrderTableService {

  /**
   * 待处理列表
   * @param {[type]} body [description]
   */
  setDealTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '姓名',
        key: 'consigneeName'
      }),
      new TableTitle({
        name: '手机号',
        key: 'mobile',
        minwidth: 85
      }),
      new TableTitle({
        name: '地址',
        key: 'address'
      }),
      new TableTitle({
        name: '兑换商品名称',
        key: 'title'
      }),
      new TableTitle({
        name: '兑换数量',
        key: 'exchangeNum'
      }),
      new TableTitle({
        name: '兑换时间',
        key: 'exchangeTime'
      }),
      new TableTitle({
        name: '发送短信',
        key: 'sendMessage',
        controlType: 'showTitle',
        minwidth: 120
      })
    ];

    return Titles;
  }
 
  /**
   * 已处理列表
   * @param {[type]} body [description]
   */
  setDealedTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '姓名',
        key: 'consigneeName'
      }),
      new TableTitle({
        name: '手机号',
        key: 'mobile',
        minwidth: 85
      }),
      new TableTitle({
        name: '地址',
        key: 'address'
      }),
      new TableTitle({
        name: '兑换商品名称',
        key: 'title'
      }),
      new TableTitle({
        name: '兑换数量',
        key: 'exchangeNum'
      }),
      new TableTitle({
        name: '兑换时间',
        key: 'exchangeTime'
      }),
      new TableTitle({
        name: '快递单号',
        key: 'trackingNum'
      }),
       new TableTitle({
        name: '处理人',
        key: 'operator'
      }),
      new TableTitle({
        name: '处理时间',
        key: 'processDate'
      }),
      new TableTitle({
        name: '编辑单号',
        key: 'editNumber',
        controlType: 'showTitle',
        minwidth: 120
      })
    ];

    return Titles;
  }

}