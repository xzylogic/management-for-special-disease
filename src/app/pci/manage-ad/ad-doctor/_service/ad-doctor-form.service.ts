import { Injectable, Inject } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class AdDoctorFormService {

  constructor(@Inject('api') private api) {
  }

  setAdDoctorForm(forms ?: any) {
    const disable = false;
    const readonly = false;
    const ad: FormBase<any> [] = [];

    ad.push(
      new FormFile({
        key: 'imageUrl',
        label: '广告图片',
        value: forms && forms.imageUrl || '',
        url: `${this.api.pci.BASE_URL}api/upload`,
        required: false,
        order: 1
      })
    );

    ad.push(
      new FormText({
        key: 'title',
        label: '广告标题',
        value: forms && forms.title || '',
        required: true,
        maxlength: 16,
        readonly: readonly,
        order: 2
      })
    );

    ad.push(
      new FormText({
        key: 'linkUrl',
        label: '广告链接',
        value: forms && forms.linkUrl || '',
        required: true,
        order: 3
      })
    );

    ad.push(
      new FormText({
        key: 'ranking',
        label: '推荐值',
        value: forms && forms.ranking || '',
        required: false,
        order: 4
      })
    );

    return ad.sort((a, b) => a.order - b.order);
  }
}
