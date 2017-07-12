import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class UserOrderTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70
      }),
      new TableTitle({
        name: '服务开始时间',
        key: 'serviceStart',
        minwidth: 70
      }),
      new TableTitle({
        name: '服务结束时间',
        key: 'serviceEnd',
        minwidth: 70
      }),
      new TableTitle({
        name: '医生同意',
        key: 'doctorAgree'
      }),
      new TableTitle({
        name: '使用情况',
        key: 'usage',
        controlType: 'showNull'
      }),
      new TableTitle({
        name: '是否有效',
        key: 'invalid'
      }),
      new TableTitle({
        name: '支付状态',
        key: 'paymentStatus'
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      })
    ];

    return Titles;
  }

  setRefundTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70
      }),
      new TableTitle({
        name: '医生拒绝理由',
        key: 'refuseReason'
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '操作',
        key: 'refund',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];

    return Titles;
  }

  setServicingTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70
      }),
      new TableTitle({
        name: '服务开始时间',
        key: 'serviceStart',
        minwidth: 70
      }),
      new TableTitle({
        name: '服务结束时间',
        key: 'serviceEnd',
        minwidth: 70
      }),
      new TableTitle({
        name: '使用情况',
        key: 'usage',
        controlType: 'showNull'
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      })
    ];

    return Titles;
  }

  setThirdTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '操作',
        key: 'thirdProcess',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];

    return Titles;
  }

}
