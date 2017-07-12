import { Injectable } from '@angular/core';

import { FormBase, FormText } from '../../../../libs';

@Injectable()
export class DoctorTitleFormService {

  setForm(data?: any) {

    const forms: FormBase<any>[] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: '职称ID',
          value: data && data.id || '',
          required: true,
          type: 'hidden',
          order: 0
        })
      );
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '职称名称',
        value: data && data.name || '',
        required: true,
        order: 1
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
