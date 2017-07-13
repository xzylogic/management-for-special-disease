import { Injectable } from '@angular/core';

import { FormBase, FormText, FormFile, FormDropdown, FormTextarea } from '../../../../libs';

@Injectable()
export class BasicServiceFormService {

  setForm(data?: any) {
    const forms: FormBase<any>[] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: 'ID',
          value: data && data.id || '',
          type: 'hidden',
          required: true,
          order: 0
        })
      );
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '服务名称',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormFile({
        key: 'iconUrl',
        label: '服务图片',
        value: data && data.iconUrl || '',
        url: '',
        required: true,
        order: 1
      }),
      new FormDropdown({
        key: 'enable',
        label: '状态',
        value: data && (data.enable == false ? data.enable : data.enable || ''),
        required: true,
        options: [{
          id: true,
          name: '启用'
        }, {
          id: false,
          name: '禁用'
        }],
        order: 4
      }),
      new FormText({
        key: 'times',
        label: '咨询次数',
        value: data && (data.times === 0 ? data.times : data.times || ''),
        required: true,
        order: 3
      }),
      new FormDropdown({
        key: 'unitId',
        label: '单位',
        value: data && data.unitId,
        required: true,
        options: [{
          id: 1,
          name: '鲜花／月'
        }, {
          id: 2,
          name: '天'
        }],
        order: 5
      }),
      // new FormCheckbox({
      //   key: 'numbers',
      //   label: '服务时长',
      //   value: data && data.serviceNumbers || '',
      //   required: true,
      //   order: 6
      // }),
      new FormTextarea({
        key: 'description',
        label: '服务说明',
        value: data && data.description || '',
        required: false,
        order: 7
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
