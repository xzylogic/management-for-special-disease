import { Injectable } from '@angular/core';

import { FormBase, FormText, FormFile } from '../../../../libs';

@Injectable()
export class FlowerGradeFormService {

  setForm(flowerClass ?: any) {

    const flowerClassforms: FormBase<any> [] = [];

    if (flowerClass) {
      flowerClassforms.push(
        new FormText({
          key: 'id',
          label: '鲜花等级ID',
          value: flowerClass && flowerClass.id || '',
          required: false,
          type: 'hidden',
          order: 0
        })
      );
    }

    flowerClassforms.push(
      new FormText({
        key: 'title',
        label: '称号',
        value: flowerClass && flowerClass.title || '',
        required: true,
        order: 1
      }),
      new FormFile({
        key: 'imgUrl',
        label: '称号图片',
        value: flowerClass && flowerClass.imageUrl || '',
        url: '',
        required: false,
        order: 2
      }),
      new FormText({
        key: 'value',
        label: '需要鲜花总数',
        value: flowerClass && flowerClass.value || '',
        required: true,
        order: 3
      }));

    return flowerClassforms.sort((a, b) => a.order - b.order);
  }
}
