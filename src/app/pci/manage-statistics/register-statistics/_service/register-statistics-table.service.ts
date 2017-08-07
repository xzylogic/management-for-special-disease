import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../libs';

@Injectable()
export class RegisterStatisticsTableService {

  setUserTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册数量',
        key: 'registerCount'
      }),
    ];
    return Titles;
  }

  setDoctorTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册数量',
        key: 'registerCount'
      }),
      new TableTitle({
        name: '审核通过',
        key: 'validateCount'
      }),
    ];
    return Titles;
  }
}
