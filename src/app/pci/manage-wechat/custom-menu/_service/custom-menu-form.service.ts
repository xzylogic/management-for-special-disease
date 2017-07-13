import { Injectable } from '@angular/core';

@Injectable()
export class CustomMenuFormService {

  // setForm(status: number, data ? : any) {
  //
  //   let forms: FormBase < any > [] = [];
  //
  //   if (data) {
  //     forms.push(
  //       new FormText({
  //         key: 'id',
  //         label: '#',
  //         value: data && data.id || '',
  //         type: 'hidden',
  //         required: true,
  //         order: 0
  //       }),
  //       new FormText({
  //         key: 'parentName',
  //         label: '主菜单名称',
  //         value: data && data.parentName || '',
  //         disabled: true,
  //         order: 0
  //       }),
  //     );
  //   }
  //   if (status != 0) {
  //     forms.push(
  //       new FormText({
  //         key: 'parentId',
  //         label: '#',
  //         value: status,
  //         required: true,
  //         type: 'hidden',
  //         order: 0
  //       }),
  //     );
  //   }
  //
  //   forms.push(
  //     new FormText({
  //       key: 'key',
  //       label: '菜单KEY值',
  //       value: data && data.key || '',
  //       order: 1
  //     }),
  //     new FormText({
  //       key: 'media_id',
  //       label: 'media_id',
  //       value: data && data.media_id || '',
  //       order: 2
  //     }),
  //     new FormText({
  //       key: 'name',
  //       label: '菜单名称',
  //       value: data && data.name || '',
  //       required: true,
  //       order: 3
  //     }),
  //     new FormText({
  //       key: 'type',
  //       label: '响应类型',
  //       value: data && data.type || '',
  //       order: 4
  //     }),
  //     new FormText({
  //       key: 'url',
  //       label: '网页链接',
  //       value: data && data.url || '',
  //       order: 5
  //     })
  //   );
  //
  //   return forms.sort((a, b) => a.order - b.order);
  // }
}
