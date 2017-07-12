import { Injectable } from '@angular/core';

import { TableTitle, ControlType } from '../../../../libs';

@Injectable()
export class FlowerGradeTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '图片',
        key: 'imageUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '称号',
        key: 'title'
      }),
      new TableTitle({
        name: '需要鲜花总数',
        key: 'value'
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
