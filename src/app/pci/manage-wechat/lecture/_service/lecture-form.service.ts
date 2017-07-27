import { Injectable, Inject } from '@angular/core';

import { Lecture } from '../_entity/lecture.entity';
import { FormBase, FormText, FormFile, FormDate, FormRadio } from '../../../../libs';

@Injectable()
export class LectureFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private authService
  ) {
  }

  setLectureForm(forms?: Lecture) {
    const _entity: FormBase < any > [] = [];
    if (forms) {
      _entity.push(
        new FormText({
          key: 'id',
          label: '医院ID',
          value: forms && forms.id || '',
          readonly: true,
          required: true,
          order: 0
        })
      );
  };

    _entity.push(
      new FormFile({
        key: 'contentImgUrl',
        label: '讲座大图',
        value: forms && forms.contentImgUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: false,
        order: 1
      })

    );

    _entity.push(
      new FormFile({
        key: 'imgUrl',
        label: '讲座小图',
        value: forms && forms.imgUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: false,
        order: 2
      })
    );

    _entity.push(
      new FormText({
        key: 'name',
        label: '讲座名称',
        value: forms && forms.name || '',
        required: true,
        maxlength: 16,
        readonly: true,
        order: 3
      })
    );

    _entity.push(
      new FormDate({
        key: 'date',
        label: '讲座时间',
        value: forms && forms.date || '',
        required: true,
        readonly: true,
        order: 4
      })
    );

    _entity.push(
      new FormText({
        key: 'address',
        label: '讲座地点',
        value: forms && forms.address || '',
        required: true,
        maxlength: 30,
        order: 5
      })
    );

    _entity.push(
      new FormDate({
        key: 'joinLimitDate',
        label: '报名截止时间',
        value: forms && forms.joinLimitDate || '',
        required: true,
        order: 6
      })
    );

    _entity.push(
      new FormText({
        key: 'url',
        label: '讲座链接',
        value: forms && forms.url || '',
        required: true,
        order: 7
      })
    );

    _entity.push(
      new FormRadio({
        key: 'charge',
        label: '是否收费',
        value: forms && forms.charge || 0,
        required: true,
        options: [
          { id: 0, name: '否', checked: false },
          { id: 1, name: '是', checked: false }
        ],
        order: 8
      })
    );

    _entity.push(
      new FormRadio({
        key: 'joinLimitCount',
        label: '人数上限',
        value: forms && forms.joinLimitCount || 0,
        required: true,
        maxlength: 5,
        options: [
          { id: 0, name: '无', checked: false },
          { id: 1, name: '上限', checked: false  }
        ],
        order: 9
      })
    );

    _entity.push(
      new FormRadio({
        key: 'onlineDate',
        label: '讲座上线时间',
        value: forms && forms.onlineDate || 0,
        required: true,
        options: [
          { id: 0, name: '保存即上线', checked: false },
          { id: 1, name: '设定上线时间', checked: false }
        ],
        order: 10
      })
    );

    // _entity.push(
    //   new FormText({
    //     key: 'admin',
    //     label: '当前登录用户ID',
    //     value: this.authService.getId(),
    //     type: 'hidden',
    //     required: false,
    //     order: 11
    //   })
    // );

    return _entity.sort((a, b) => a.order - b.order);
  }
}
