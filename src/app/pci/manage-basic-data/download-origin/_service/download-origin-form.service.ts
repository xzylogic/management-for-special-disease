import { Injectable } from '@angular/core';

import { FormBase, FormText } from '../../../../libs';

@Injectable()
export class DownloadOriginFormService {

  setForm(data?: any) {

    const forms: FormBase<any> [] = [];

    forms.push(
      new FormText({
        key: 'name',
        label: '渠道名称',
        value: data && data.name || '',
        required: true,
        order: 1
      }),
      new FormText({
        key: 'alias',
        label: '渠道别名',
        value: data && data.alias || '',
        required: true,
        order: 2
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
