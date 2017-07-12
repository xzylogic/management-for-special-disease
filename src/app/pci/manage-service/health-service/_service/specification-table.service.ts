import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class SpecificationTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '规格名称',
        key: 'name'
      }),
      new TableTitle({
        name: '价格',
        key: 'price',
      }),
      new TableTitle({
        name: '总共次数',
        key: 'count'
      }),
      new TableTitle({
        name: '服务次数',
        key: 'times',
      }),
      new TableTitle({
        name: '服务规格',
        key: 'specificationType',
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'edit'
      })
    ];
    return Titles;
  }

}
