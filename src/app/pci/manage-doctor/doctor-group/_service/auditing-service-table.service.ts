import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class AuditingServiceTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '医生小组名称',
        key: 'groupName'
      }),
      new TableTitle({
        name: '组长',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '开通服务',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '服务说明',
        key: 'description'
      }),
      new TableTitle({
        name: '开通时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '审核通过',
        key: 'auditing',
        controlType: 'showTitle',
        minwidth: 100
      }),
    ];
    
    return Titles;
  }

}
