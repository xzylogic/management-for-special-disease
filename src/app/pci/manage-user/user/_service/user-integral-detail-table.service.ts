import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class UserIntegralDetailTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '积分流水',
        key: 'integralTransaction'
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'remainingIntegral'
      }),
      new TableTitle({
        name: '项目',
        key: 'content',
      }),
      new TableTitle({
        name: '被邀请人手机号',
        key: 'invitedTel'
      }),
      new TableTitle({
        name: '时间',
        key: 'recordTime',
      }),
    ];
    
    return Titles;
  }

}
