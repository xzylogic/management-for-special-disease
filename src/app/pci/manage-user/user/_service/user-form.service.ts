import { Injectable } from '@angular/core';

import { FormBase, FormText, FormFile, FormTextarea, FormDropdown } from '../../../../entities';

@Injectable()
export class UserFormService {

  setForm(hospitalList, data ? : any) {

    let forms: FormBase < any > [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'userId',
          label: '用户ID',
          value: data && data.id || '',
          type: 'hidden',
          required: true,
          order: 0
        }),
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          type: 'hidden',
          required: true,
          order: 1
        }));
    } else {
      forms.push(
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          required: true,
          order: 1
        }));
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '用户姓名',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormFile({
        key: 'avatarUrl',
        label: '头像',
        value: data && data.avatarUrl || '',
        accept: 'image/*',
        required: false,
        order: 3
      }),
      new FormDropdown({
        key: 'sex',
        label: '性别',
        value: data && (data.sex === 0 ? data.sex : data.sex || ''),
        required: true,
        options: [
          { id: 0, name: '男' },
          { id: 1, name: '女' }
        ],
        order: 4
      }),
      new FormText({
        key: 'age',
        label: '年龄',
        value: data && (data.age === 0 ? data.age : data.age || ''),
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'hospitalId',
        label: '手术医院',
        value: data && (data.hospitalId || ''),
        required: false,
        options: hospitalList,
        order: 6
      }),
      new FormText({
        key: 'surgeon',
        label: '手术医生',
        value: data && (data.surgeon || ''),
        required: false,
        order: 7
      }),
      new FormText({
        key: 'lastOperationDate',
        label: '最后手术时间',
        value: data && (data.lastOperationDate || ''),
        type: 'text',
        required: false,
        order: 7
      }),
      new FormText({
        key: 'bracketNum',
        label: '支架个数',
        value: data && (data.bracketNum === 0 ? data.bracketNum : data.bracketNum || ''),
        required: false,
        order: 8
      }),
      new FormText({
        key: 'caseHistory',
        label: '病史',
        value: data && data.caseHistory || '',
        required: false,
        order: 9
      }),
      new FormTextarea({
        key: 'address',
        label: '地址',
        value: data && data.address || '',
        required: false,
        order: 10
      }),
      new FormTextarea({
        key: 'remark',
        label: '备注',
        value: data && data.remark || '',
        required: false,
        order: 11
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }

}
