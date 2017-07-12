import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class OperationPushTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: 'Push内容',
        key: 'content',
      }),
      new TableTitle({
        name: 'Push链接',
        key: 'pushUrl'
      }),
      new TableTitle({
        name: '点击量',
        key: 'click'
      }),
      new TableTitle({
        name: '上传者',
        key: 'operator'
      }),
      new TableTitle({
        name: '发送时间',
        key: 'pushTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'state'
      }),
      new TableTitle({
        name: '编辑',
        key: 'status',
        controlType: 'showEdit',
        minwidth: 200
      })
    ];
    return Titles;
  }

}