import { Injectable } from '@angular/core';

import { FormBase, FormText } from '../../../libs';

@Injectable()
export class ReadCoefficientFormService {

  ReadCoefficientForm(readcoefficient?: any) {

    const forms: FormBase<any>[] = [];

    forms.push(
      new FormText({
        key: 'data',
        label: '配置阅读量系数',
        value: readcoefficient && readcoefficient.data || '',
        required: true,
        order: 1
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }

}
