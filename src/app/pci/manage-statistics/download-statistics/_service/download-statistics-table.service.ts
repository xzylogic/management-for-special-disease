import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DownloadStatisticsTableService {
  
  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '渠道来源',
        key: 'name'
      }),
      new TableTitle({
        name: 'PV',
        key: 'pv'
      }),
      new TableTitle({
        name: 'UV',
        key: 'uv'
      }),
      new TableTitle({
        name: 'IOS下载量',
        key: 'ios'
      }),
      new TableTitle({
        name: 'Android下载量',
        key: 'android'
      })
    ];

    return Titles;
  }  

  setMainTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '渠道来源',
        key: 'name'
      }),
      new TableTitle({
        name: 'PV',
        key: 'pv'
      }),
      new TableTitle({
        name: 'UV',
        key: 'uv'
      })
    ];

    return Titles;
  }

}