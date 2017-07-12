import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class NewsClassifyFormService {

  setForm( healthInfo ? : any) {

    let disable: boolean = false;
    let healthInfoforms: FormBase<any>[] = [];
    if (healthInfo) {
      disable = true;
      healthInfoforms.push(
        new FormText({
          key: 'id',
          label: '健康资讯ID',
          value: healthInfo && healthInfo.id || '',
          disable: disable,
          required: true,
          type: "hidden",
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