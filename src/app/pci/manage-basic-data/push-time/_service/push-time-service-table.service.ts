import { Injectable } from '@angular/core';

import { TableTitle, ControlType } from '../../../../libs';

@Injectable()
export class PushTimeTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '项目名称',
        key: 'desc',
      }),
      new TableTitle({
        name: '推送时间',
        key: 'value'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
