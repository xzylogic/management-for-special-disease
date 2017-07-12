import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class BasicServiceTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '服务图片',
        key: 'iconUrl',
        controlType: 'image'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'name',
      }),
      new TableTitle({
        name: '咨询次数',
        key: 'times'
      }),
      new TableTitle({
        name: '状态',
        key: 'enableName'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];

    return Titles;
  }

}
