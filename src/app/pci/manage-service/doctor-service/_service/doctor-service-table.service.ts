import { Injectable } from '@angular/core';

import { ControlType, TableTitle } from '../../../../libs';

@Injectable()
export class DoctorServiceTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '服务图片',
        key: 'iconUrl',
        controlType: ControlType.image,
      }),
      new TableTitle({
        name: '服务名称',
        key: 'name'
      }),
      new TableTitle({
        name: '状态',
        key: 'enableName',
        minwidth: 85
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }
}
