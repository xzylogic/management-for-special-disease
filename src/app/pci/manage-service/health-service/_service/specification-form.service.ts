import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class SpecificationFormService {

  setForm(data ? : any) {

    let forms: FormBase<any>[] = [];
    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: '#',
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
        label: '规格名称',
        value: data && data.name || '',
        required: true,
        order: 1
      }),
      new FormText({
        key: 'price',
        label: '价格',
        value: data && data.price || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'count',
        label: '总共次数',
        value: data && (data.count === 0 ? data.count : data.count || ''),
        required: true,
        order: 3
      }),
      new FormText({
        key: 'times',
        label: '服务次数',
        value: data && (data.times === 0 ? data.times : data.times || ''),
        required: true,
        order: 4
      }),
      new FormDropdown({
        key: 'specificationType',
        label: '套餐类型',
        value: data && data.specificationType,
        required: true,
        options: [
        { id: 'Ordinary', name: '普通套餐' },
        { id: 'Custom', name: '组合套餐' }
        ],
        order: 4
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}