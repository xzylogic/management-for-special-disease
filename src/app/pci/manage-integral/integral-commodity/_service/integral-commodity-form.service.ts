import { Injectable, Inject } from '@angular/core';

import { FormBase, FormText, FormFile, FormDropdown, FormTextarea } from '../../../../libs';

@Injectable()
export class IntegralCommodityFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth
  ) {
  }

  setForm(data?: any) {
    const forms: FormBase<any>[] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'goodsId',
          label: 'ID',
          value: data && data.id || '',
          readonly: true,
          required: false,
          order: 0
        })
      );
    }

    forms.push(
      new FormFile({
        key: 'picUrl',
        label: '商品图片',
        value: data && data.picUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: true,
        order: 1
      }),
      new FormText({
        key: 'title',
        label: '商品标题',
        value: data && data.title || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'recommendValue',
        label: '推荐值',
        value: data && (data.recommendValue === 0 ? data.recommendValue : data.recommendValue || ''),
        type: 'number',
        required: false,
        order: 3
      }),
      new FormText({
        key: 'integral',
        label: '兑换积分',
        value: data && (data.integral === 0 ? data.integral : data.integral || ''),
        type: 'number',
        required: true,
        order: 4
      }),
      new FormDropdown({
        key: 'statusIdx',
        label: '状态',
        value: data && (data.goodsStatus === 0 ? data.goodsStatus : data.goodsStatus || ''),
        required: true,
        options: [{
          id: 0,
          name: '上架'
        }, {
          id: 1,
          name: '下架'
        }],
        order: 5
      }),
      new FormDropdown({
        key: 'typeIdx',
        label: '添加到APP',
        value: data && (data.goodsType === 0 ? data.goodsType : data.goodsType || ''),
        required: true,
        options: [{
          id: 0,
          name: '患者端'
        }, {
          id: 1,
          name: '医生端'
        }, {
          id: 2,
          name: '全部'
        }],
        order: 6
      }),
      new FormText({
        key: 'freight',
        label: '运费',
        value: data && (data.freight === 0 ? data.freight : data.freight || ''),
        type: 'number',
        required: false,
        order: 7
      }),
      new FormTextarea({
        key: 'introduction',
        label: '商品描述',
        value: data && data.introduction || '',
        required: true,
        order: 8
      }),
      new FormText({
        key: 'operator',
        label: '操作人',
        value: this.auth.getAdminName(),
        readonly: true,
        required: false,
        order: 9
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
