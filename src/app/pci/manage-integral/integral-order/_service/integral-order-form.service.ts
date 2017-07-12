import { Injectable, Inject } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown
} from '../../../../entities';

@Injectable()
export class IntegralOrderFormService {
    constructor(@Inject('admin') private admin) {}

  setSendMessageForm(data ? : any) {

    let forms: FormBase < any > [] = [];

    forms.push(
      new FormDropdown({
        key: 'expressName',
        label: '快递公司',
        value: data && data.name || '',
        disable: true,
        required: true,
        order: 1
      }),
      new FormText({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.trackingNum || '',
        disable: true,
        required: true,
        order: 2
      }),
        new FormText({
        key: 'message',
        label: '短信内容',
        value: data && data.message || '',
        disable: true,
        required: true,
        order: 3
      }),
    );

    return forms.sort((a, b) => a.order - b.order);
  }

  setEditNumberForm(data ? : any) {

    let forms: FormBase < any > [] = [];

    forms.push(
      new FormDropdown({
        key: 'expressName',
        label: '快递公司',
        value: data && data.name || '',
        disable: true,
        required: true,
        order: 1
      }),
      new FormText({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.trackingNum || '',
        disable: true,
        required: true,
        order: 2
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }

}
