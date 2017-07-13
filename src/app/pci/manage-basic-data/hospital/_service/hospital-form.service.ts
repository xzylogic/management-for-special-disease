import { Injectable } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class HospitalFormService {

  setHospitalForm(hospital?: any) {

    const hospitalforms: FormBase<any>[] = [];

    if (hospital) {
      hospitalforms.push(
        new FormText({
          key: 'id',
          label: '医院ID',
          value: hospital && hospital.id || '',
          disabled: true,
          required: true,
          type: 'hidden',
          order: 0
        })
      );
    }

    hospitalforms.push(
      new FormFile({
        key: 'imageUrl',
        label: '医院图片',
        value: hospital && hospital.imageUrl || '',
        url: '',
        required: false,
        order: 1
      })
    );

    hospitalforms.push(
      new FormText({
        key: 'name',
        label: '医院名称',
        value: hospital && hospital.name || '',
        required: true,
        order: 2
      })
    );

    return hospitalforms.sort((a, b) => a.order - b.order);
  }
}
