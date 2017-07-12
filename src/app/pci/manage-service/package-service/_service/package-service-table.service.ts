import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class PackageServiceTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '套餐包图片',
        key: 'iconUrl',
        controlType: 'image'
      }),
      new TableTitle({
        name: '套餐包名称',
        key: 'name'
      }),
      new TableTitle({
        name: '医生小组',
        key: 'groupName'
      }),
      new TableTitle({
        name: '医生小组服务',
        key: 'packageServiceName'
      }),
      new TableTitle({
        name: '第三方服务',
        key: 'thirdServiceList'
      }),
      new TableTitle({
        name: '添加人',
        key: 'operator'
      }),
      new TableTitle({
        name: '添加时间',
        key: 'createdDate',
        minwidth: 70
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
