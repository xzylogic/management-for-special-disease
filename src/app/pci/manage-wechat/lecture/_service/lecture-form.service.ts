import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LectureFormService {

  // constructor(@Inject('admin') private admin) {}
  //
  // setLectureForm(forms ? : any) {
  //   let disable: boolean = false;
  //   let readonly: boolean = false;
  //   let lecture: FormBase < any > [] = [];
  //   if (forms) {
  //     disable = true;
  //     readonly = true;
  //     lecture.push(
  //       new FormText({
  //         key: 'id',
  //         label: '医院ID',
  //         value: forms && forms.id || '',
  //         disable: disable,
  //         required: false,
  //         type: "hidden",
  //         order: 0
  //       })
  //     );
  // };
  //
  //   lecture.push(
  //     new FormFile({
  //       key: 'contentImgUrl',
  //       label: '讲座大图',
  //       value: forms && forms.contentImgUrl || '',
  //       accept: 'image/*',
  //       required: false,
  //       order: 1
  //     })
  //
  //   );
  //
  //   lecture.push(
  //     new FormFile({
  //       key: 'imgUrl',
  //       label: '讲座小图',
  //       value: forms && forms.imgUrl || '',
  //       accept: 'image/*',
  //       required: false,
  //       order: 2
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormText({
  //       key: 'name',
  //       label: '讲座名称',
  //       value: forms && forms.name || '',
  //       required: true,
  //       maxlength: "16",
  //       readonly:readonly,
  //       order: 3
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormText({
  //       key: 'date',
  //       label: '讲座时间',
  //       value: forms && forms.date || '',
  //       required: true,
  //       readonly:readonly,
  //       placeholder: 'xxxx-xx-xx xx:xx',
  //       type: "text",
  //       order: 4
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormText({
  //       key: 'address',
  //       label: '讲座地点',
  //       value: forms && forms.address || '',
  //       required: true,
  //       maxlength: "30",
  //       order: 5
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormText({
  //       key: 'joinLimitDate',
  //       label: '报名截止时间',
  //       value: forms && forms.joinLimitDate || '',
  //       required: true,
  //       placeholder: 'xxxx-xx-xx xx:xx',
  //       type: "datetime-local",
  //       order: 6
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormText({
  //       key: 'url',
  //       label: '讲座链接',
  //       value: forms && forms.url || '',
  //       required: true,
  //       order: 7
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormLectureCheckbox({
  //       key: 'charge',
  //       label: '是否收费',
  //       value: forms && forms.charge || 0,
  //       required: true,
  //       type: 'number',
  //       maxlength: "6",
  //       placeholder: '请设置收费金额',
  //       options: [
  //         { id: 0, name: '否' },
  //         { id: 1, name: '是' }
  //       ],
  //       order: 8
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormLectureCheckbox({
  //       key: 'joinLimitCount',
  //       label: '人数上限',
  //       value: forms && forms.joinLimitCount || 0,
  //       required: true,
  //       type: 'number',
  //       maxlength: "5",
  //       placeholder: '请设置人数上限',
  //       options: [
  //         { id: 0, name: '无' },
  //         { id: 1, name: '上限' }
  //       ],
  //       order: 9
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormLectureCheckbox({
  //       key: 'onlineDate',
  //       label: '讲座上线时间',
  //       value: forms && forms.onlineDate || 0,
  //       required: true,
  //       type: "datetime-local",
  //       placeholder: 'xxxx-xx-xx xx:xx',
  //       options: [
  //         { id: 0, name: '保存即上线' },
  //         { id: 1, name: '设定上线时间' }
  //       ],
  //       order: 10
  //     })
  //   );
  //
  //   lecture.push(
  //     new FormText({
  //       key: 'admin',
  //       label: '当前登录用户ID',
  //       value: this.admin.getId(),
  //       type: 'hidden',
  //       required: false,
  //       order: 11
  //     })
  //   );
  //
  //   return lecture.sort((a, b) => a.order - b.order);
  // }
}
