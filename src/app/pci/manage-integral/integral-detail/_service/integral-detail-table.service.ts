import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../libs';

@Injectable()
export class IntegralDetailTableService {
  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'remainingIntegral'
      }),
      new TableTitle({
        name: '项目',
        key: 'content'
      }),
      new TableTitle({
        name: '明细',
        key: 'integralTransaction'
      })
    ];

    return Titles;
  }
}
