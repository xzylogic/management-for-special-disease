import { Injectable } from '@angular/core';

import { FormBase, FormText, FormFile, FormDropdown } from '../../../../libs';

@Injectable()
export class DiscomfortSymptomFormService {

  setForm(
    symptomTypes: Array<any>,
    symptomTypeId ?: number,
    data?: any
  ) {

    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'symptomId',
          label: '不适症状ID',
          value: data && data.id || '',
          type: 'hidden',
          required: true,
          order: 0
        }));
    }

    forms.push(
      new FormDropdown({
        key: 'symptomTypeId',
        label: '请选择类型',
        value: symptomTypeId || '',
        required: true,
        options: symptomTypes,
        order: 1
      }),
      new FormFile({
        key: 'symptomUrl',
        label: '说明图片（可选）',
        value: data && data.symptomUrl || '',
        required: false,
        order: 2
      }),
      new FormText({
        key: 'name',
        label: '名称',
        value: data && data.name || '',
        required: true,
        order: 4
      }),
      new FormDropdown({
        key: 'enable',
        label: '状态',
        value: data && (data.enable === false ? data.enable : data.enable || ''),
        required: true,
        options: [
          {id: true, name: '启用'},
          {id: false, name: '禁用'}
        ],
        order: 5
      }));

    return forms.sort((a, b) => a.order - b.order);
  }
}
