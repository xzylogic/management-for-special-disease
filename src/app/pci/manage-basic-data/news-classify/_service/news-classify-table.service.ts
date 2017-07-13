import { Injectable } from '@angular/core';

import { TableTitle, ControlType } from '../../../../libs';

@Injectable()
export class NewsClassifyTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '健康资讯分类',
        key: 'name'
      }),
      new TableTitle({
        name: '编辑',
        key: 'editHealthInfo',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
