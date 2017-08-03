import { Injectable, Inject } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class AdDoctorFormService {

  constructor(@Inject('app') private app) {
  }

  setAdDoctorForm(data?: any) {
    const form: FormBase<any> [] = [];

    form.push(
      new FormFile({
        key: 'imageUrl',
        label: '广告图片',
        value: data && data.imageUrl || '',
        url: this.app.pci.UPLOAD_URL,
        required: true,
        order: 1
      }),
      new FormText({
        key: 'title',
        label: '广告标题',
        value: data && data.title || '',
        required: true,
        maxlength: 16,
        order: 2
      }),
      new FormText({
        key: 'linkUrl',
        label: '广告链接',
        value: data && data.linkUrl || '',
        required: true,
        order: 3
      }),
      new FormText({
        key: 'ranking',
        label: '推荐值',
        value: data && data.ranking || 0,
        required: false,
        order: 4
      })
    );

    return form.sort((a, b) => a.order - b.order);
  }
}
