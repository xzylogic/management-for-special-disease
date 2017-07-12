import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class ServiceDetailTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '购买人',
        key: 'patientName'
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
        name: '状态',
        key: 'validStatus'
      })
    ];
    
    return Titles;
  }

}
