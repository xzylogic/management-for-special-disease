import { Injectable } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown
} from '../../../../entities';

@Injectable()
export class ServiceRecordFormService {

  setForm(serviceList: any) {

    let forms: FormBase < any > [] = [
      new FormDropdown({
        key: 'serviceId',
        label: '选择服务',
        value: '',
        required: true,
        options: serviceList,
        order: 1
      }),
    ];

    return forms.sort((a, b) => a.order - b.order);
  }

}
