import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class VersionControlTableService {
  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '版本号',
        key: 'version'
      }),
      new TableTitle({
        name: '更新标题',
        key: 'title',
      }),
      new TableTitle({
        name: '更新详情',
        key: 'content'
      }),
      new TableTitle({
        name: '下载地址',
        key: 'url',
      }),
      new TableTitle({
        name: '平台',
        key: 'platformName',
      }),
      new TableTitle({
        name: '产品',
        key: 'productName',
      }),
      new TableTitle({
        name: '是否强制更新',
        key: 'hardName',
      }),
      new TableTitle({
        name: '更新日期',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '操作人',
        key: 'admin'
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
