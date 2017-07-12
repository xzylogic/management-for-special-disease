import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class FollowUpPlanTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '随访项',
        key: 'name'
      }),
      new TableTitle({
        name: '自定义内容',
        key: 'customName'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];

    return Titles;
  }

}
