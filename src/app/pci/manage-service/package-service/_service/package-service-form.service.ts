import { Injectable } from '@angular/core';
import { FormBase, FormText, FormFile, FormTextarea, FormDropdown, FormCheckbox } from '../../../../entities';

@Injectable()
export class PackageServiceFormService {

  setForm(doctorPackages, thirdPackages, data ? : any) {
    
    let forms: FormBase<any>[] = [];
    
    if (data) {
      forms.push(
        new FormText({
          key: 'combinatorialId',
          label: '用户ID',
          value: data && data.id || '',
          type: 'hidden',
          required: true,
          order: 0
        })
      );
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '套餐名称',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormFile({
        key: 'iconUrl',
        label: '套餐图片',
        value: data && data.iconUrl || '',
        accept: 'image/*',
        required: false,
        order: 1
      }),
      new FormDropdown({
        key: 'doctorPackageId',
        label: '医生小组服务',
        value: data && (data.packageId === 0 ? data.packageId : data.packageId || ''),
        required: true,
        options: doctorPackages,
        order: 4
      }),
      new FormCheckbox({
        key: 'specificationIds',
        label: '第三方服务',
        value: data && (data.thirdServiceIds === 0 ? data.thirdServiceIds : data.thirdServiceIds || ''),
        required: false,
        options: thirdPackages,
        order: 4
      }),
      new FormText({
        key: 'price',
        label: '套餐价格',
        value: data && (data.price === 0 ? data.price : data.price || ''),
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'enable',
        label: '状态',
        value: data && (data.enable == 0 ? data.enable : data.enable || ''),
        required: true,
        options: [
        { id: true, name: '启用' },
        { id: false, name: '禁用' }
        ],
        order: 4
      }),
      new FormTextarea({
        key: 'description',
        label: '套餐说明',
        value: data && data.description || '',
        required: false,
        order: 11
      }),
      new FormText({
        key: 'operator',
        label: '套餐价格',
        type: 'hidden',
        value: JSON.parse(window.sessionStorage.getItem('pci_login_token')).name || '',
        order: 12
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}