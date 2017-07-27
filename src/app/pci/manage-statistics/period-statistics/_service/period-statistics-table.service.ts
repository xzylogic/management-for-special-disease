import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../libs';

@Injectable()
export class PeriodStatisticsTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '时间段内登录总数',
        key: 'totalLoginCount'
      }),
      new TableTitle({
        name: '登录人数',
        key: 'loginGroupCount'
      }),
      new TableTitle({
        name: '登录率',
        key: 'loginRate'
      }),
      new TableTitle({
        name: '人均登录数',
        key: 'averageLogin'
      })
    ];

    return Titles;
  }
}
