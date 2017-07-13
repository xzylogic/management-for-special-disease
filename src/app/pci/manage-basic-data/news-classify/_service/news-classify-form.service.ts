import { Injectable } from '@angular/core';

import { FormBase, FormText } from '../../../../libs';

@Injectable()
export class NewsClassifyFormService {

  setForm(healthInfo?: any) {

    const healthInfoforms: FormBase<any>[] = [];

    if (healthInfo) {
      healthInfoforms.push(
        new FormText({
          key: 'id',
          label: '健康资讯ID',
          value: healthInfo && healthInfo.id || '',
          disabled: true,
          required: true,
          type: 'hidden',
          order: 0
        })
      );
    }

    healthInfoforms.push(
      new FormText({
        key: 'name',
        label: '健康资讯分类',
        value: healthInfo && healthInfo.name || '',
        required: true,
        order: 1
      })
    );

    return healthInfoforms.sort((a, b) => a.order - b.order);
  }
}
