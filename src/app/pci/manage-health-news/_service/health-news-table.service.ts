import { Injectable } from '@angular/core';

import { TableTitle } from '../../../entities';

@Injectable()
export class HealthNewsTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '图片',
        key: 'imageUrl',
        controlType: 'image'
      }),
      new TableTitle({
        name: '文章标题',
        key: 'title'
      }),
      new TableTitle({
        name: '文章链接',
        key: 'link',
        maxwidth:500
      }),
      new TableTitle({
        name: '推荐值',
        key: 'ranking'
      }),
      new TableTitle({
        name: '实际阅读量',
        key: 'actualReading'
      }),
      new TableTitle({
        name: '展示阅读量',
        key: 'showReading'
      }),
      new TableTitle({
        name: '上传者',
        key: 'admin'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: 'showTitle',
        minwidth: 65
      })
    ];

    return Titles;
  }

}
