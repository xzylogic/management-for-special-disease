import { Injectable, Inject } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class AdPatientFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private authService
  ) {
  }

  setAdPatientForm(forms ?: any) {
    const disable: boolean = false;
    const readonly: boolean = false;
    const ad: FormBase<any> [] = [];
    ad.push(
      new FormText({
        key: 'subTitle',
        label: '广告短标题',
        value: forms && forms.subTitle || '',
        maxlength: 4,
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

