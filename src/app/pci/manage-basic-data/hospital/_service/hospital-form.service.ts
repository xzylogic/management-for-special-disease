import { Inject, Injectable } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class HospitalFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth
  ) {
  }

  setHospitalForm(hospital?: any) {

    const hospitalforms: FormBase<any>[] = [];

    if (hospital) {
      hospitalforms.push(
        new FormText({
          key: 'id',
          label: '医院ID',
          value: hospital && hospital.id || '',
          required: true,
          readonly: true,
          order: 0
        })
      );
    }

    hospitalforms.push(
      new FormFile({
        key: 'imageUrl',
        label: '医院图片',
        value: hospital && hospital.imageUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
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
