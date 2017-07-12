import { Injectable } from '@angular/core';

import { TableTitle, ControlType } from '../../../../libs';

@Injectable()
export class DownloadOriginTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '渠道名称',
        key: 'name',
      }),
      new TableTitle({
        name: '渠道别名',
        key: 'alias',
      }),
      new TableTitle({
        name: '渠道链接',
        key: 'url',
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }

}
