import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class BusinessStatisticsTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '项目',
        key: 'name'
      }),
      new TableTitle({
        name: '数量',
        key: 'value'
      })
    ];

    return Titles;
  }

}
