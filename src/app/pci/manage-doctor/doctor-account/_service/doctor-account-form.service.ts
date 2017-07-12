import { Injectable } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown
} from '../../../../entities';

@Injectable()
export class DoctorAccountFormService {

  setForm(data ? : any) {

    let forms: FormBase < any > [] = [];

    forms.push(
      new FormText({
        key: 'expressName',
        label: '快递公司',
        value: data && data.expressCompany || '',
        disable: true,
        required: true,
        order: 1
      }),

      new FormTextarea({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.expressNo || '',
        disable: true,
        required: true,
        order: 2
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }

}
