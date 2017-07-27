/**
 * Created by zhanglin on 2017/7/24.
 */
import { Inject, Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';

@Injectable()
export class ServiceSpecFormService {

  // constructor(
  //   @Inject('app') private app,
  //   @Inject('auth') private auth
  // ) {
  // }
  //
  // setForm(thirdList, data?: any) {
  //
  //   const forms: FormBase<any> [] = [];
  //
  //   if (data) {
  //     forms.push(
  //       new FormText({
  //         key: 'id',
  //         label: 'ID',
  //         value: data && data.id || '',
  //         readonly: true,
  //         required: true,
  //         order: 0
  //       })
  //     )
  //   }
  //   forms.push(
  //     new FormText({
  //       key: 'name',
  //       label: '规格名称',
  //       value: data && data.name || '',
  //       required: false,
  //       order: 1
  //     }),
  //     new FormDropdown({
  //       key: 'specificationIdx',
  //       label: '所属类型',
  //       value: data && (data.specificationIdx === 0 ? data.specificationIdx : data.specificationIdx || ''),
  //       required: false,
  //       options: [
  //         {id: 0, name: '供第三方服务'},
  //         {id: 1, name: '供组合服务'}
  //         ],
  //       order: 2
  //     }),
  //     new FormText({
  //       key: 'price',
  //       label: '价格',
  //       value: data && data.price || 0,
  //       required: false,
  //       order: 3
  //     }),
  //     new FormText({
  //       key: 'count',
  //       label: '库存数量',
  //       value: data && data.count || 0,
  //       required: false,
  //       order: 4
  //     }),
  //     new FormDropdown({
  //       key: 'serviceId',
  //       label: '所属第三方服务',
  //       value: data && data.serviceId || 1,
  //       required: false,
  //       options: thirdList,
  //       order: 5
  //     }),
  //     new FormDropdown({
  //       key: 'enable',
  //       label: '状态',
  //       value: data && (data.enable === false ? data.enable : data.enable || ''),
  //       required: false,
  //       options: [
  //         {id: true, name: '启用'},
  //         {id: false, name: '禁用'}
  //       ],
  //       order: 6
  //     }),
  //     new FormText({
  //       key: 'operator',
  //       label: '添加用户',
  //       value: this.auth.getAdminName(),
  //       readonly: true,
  //       required: false,
  //       order: 7
  //     })
  //   );
  //   return forms.sort((a, b) => a.order - b.order);
  // }
}
