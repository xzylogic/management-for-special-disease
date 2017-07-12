import { Injectable } from '@angular/core';

import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown
} from '../../../entities';

@Injectable()
export class ReadCoefficientFormService {

  ReadCoefficientForm(readcoefficient ? : any) {

    let readcoefficientforms: FormBase < any > [] = [];

    readcoefficientforms.push(
      new FormText({
        key: 'data',
        label: '配置阅读量系数',
        value: readcoefficient && readcoefficient.data || '',
        required: true,
        order: 1
      })
    );

    return readcoefficientforms.sort((a, b) => a.order - b.order);
  }

}
