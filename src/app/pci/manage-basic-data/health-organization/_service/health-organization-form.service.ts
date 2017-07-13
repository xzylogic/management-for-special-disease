import { Injectable } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class HealthOrganizationFormService {

  setForm(thirdParty?: any) {

    const thirdPartyforms: FormBase<any> [] = [];

    if (thirdParty) {
      thirdPartyforms.push(
        new FormText({
          key: 'id',
          label: '机构ID',
          value: thirdParty && thirdParty.id || '',
          required: true,
          type: 'hidden',
          order: 0
        })
      );
    }

    thirdPartyforms.push(
      new FormFile({
        key: 'imageUrl',
        label: '机构图片',
        value: thirdParty && thirdParty.imageUrl || '',
        url: '',
        required: true,
        order: 1
      })
    );

    thirdPartyforms.push(
      new FormText({
        key: 'name',
        label: '机构名称',
        value: thirdParty && thirdParty.name || '',
        required: true,
        order: 2
      })
    );

    return thirdPartyforms.sort((a, b) => a.order - b.order);
  }
}
