import { Injectable, Inject } from '@angular/core';
import {
  FormBase,
  FormText,
  FormFile,
  FormTextarea,
  FormDropdown,
  FormEditor
} from '../../../../entities';

@Injectable()
export class HealthServiceFormService {

constructor(@Inject('admin') private admin) {}

  setForm(organizationList, data ? : any) {

    let forms: FormBase < any > [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'serviceId',
          label: 'ID',
          value: data && data.serviceId || '',
          type: 'hidden',
          required: true,
          order: 0
        })
      );
    }

    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '服务小图',
        value: data && data.imageUrl || '',
        accept: 'image/*',
        required: false,
        order: 1
      }),
      new FormFile({
        key: 'pictures',
        label: '详情图片',
        value: data && data.pictures || [],
        accept: 'image/*',
        multiple: true,
        required: false,
        order: 2
      }),
      new FormText({
        key: 'title',
        label: '服务名称',
        value: data && data.title || '',
        required: false,
        order: 3
      }),
      new FormDropdown({
        key: 'organId',
        label: '服务机构',
        value: data && data.organId || '',
        required: false,
        options: organizationList,
        order: 4
      }),
      new FormDropdown({
        key: 'enable',
        label: '状态',
        value: data && (data.enable === false ? data.enable : data.enable || ''),
        required: false,
        options: [
          { id: true, name: '启用' },
          { id: false, name: '禁用' }
        ],
        order: 5
      }),
      new FormTextarea({
        key: 'description',
        label: '服务简介',
        value: data && (data.description || ''),
        required: false,
        order: 6
      }),
      new FormEditor({
        key: 'content',
        label: '商品描述',
        value: data && data.content || '',
        required: false,
        order: 7
      }),
      new FormText({
        key: 'createdBy',
        label: '添加用户',
        value: this.admin.getName(),
        type: 'hidden',
        required: false,
        order: 10
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }

}
