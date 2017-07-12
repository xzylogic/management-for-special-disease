import {
  Injectable
} from '@angular/core';

import {
  TableTitle
} from '../../../../entities';

@Injectable()
export class IntegralCommodityTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '商品图片',
        key: 'picUrl',
        controlType: 'image'
      }),
      new TableTitle({
        name: '商品名称',
        key: 'title',
      }),
      new TableTitle({
        name: '兑换积分',
        key: 'integral'
      }),
      new TableTitle({
        name: '添加人',
        key: 'operator',
      }),
      new TableTitle({
        name: '添加时间',
        key: 'recordTime',
        minwidth: 70
      }),
      new TableTitle({
        name: '推荐值',
        key: 'recommendValue'
      }),
      new TableTitle({
        name: '状态',
        key: 'goodsStatusName'
      }),
      new TableTitle({
        name: '上／下架',
        key: 'updown',
        controlType: 'showKey',
        minwidth: 65
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
