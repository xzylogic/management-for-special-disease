import { Injectable, Inject } from '@angular/core';

import { FormBase, FormText, FormDropdown } from '../../../../libs';

@Injectable()
export class IntegralOrderFormService {
  constructor(@Inject('admin') private admin) {
  }

  setSendMessageForm(data?: any) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormText({
        key: 'expressName',
        label: '快递公司',
        value: data && data.name || '',
        disabled: true,
        required: true,
        order: 1
      }),
      new FormText({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.trackingNum || '',
        disabled: true,
        required: true,
        order: 2
      }),
      new FormText({
        key: 'message',
        label: '短信内容',
        value: data && data.message || '',
        disabled: true,
        required: true,
        order: 3
      }),
    );

    return forms.sort((a, b) => a.order - b.order);
  }

  setEditNumberForm(data?: any) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormText({
        key: 'expressName',
        label: '快递公司',
        value: data && data.name || '',
        disabled: true,
        required: true,
        order: 1
      }),
      new FormText({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.trackingNum || '',
        disabled: true,
        required: true,
        order: 2
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
