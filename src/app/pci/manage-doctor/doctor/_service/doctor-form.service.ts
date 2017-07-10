import { Inject, Injectable } from '@angular/core';
import { Doctor } from '../_store/doctor.state';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormDate } from '../../../../libs/dform/_entity/form-date';
import { FormDatetime } from '../../../../libs/dform/_entity/form-datetime';
import { FormTime } from '../../../../libs/dform/_entity/form-time';
import { FormCheckbox } from '../../../../libs/dform/_entity/form-checkbox';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';

@Injectable()
export class DoctorFormService {

  constructor(@Inject('app') private app) {
  }

  setForm(
    hospitals: Array<any>,
    departments: Array<any>,
    doctorTitles: Array<any>,
    data?: Doctor
  ) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormDate({
        key: 'date',
        label: '日期',
        value: new Date(),
        required: true,
        order: 0
      }),
      new FormTime({
        key: 'time',
        label: '时间',
        value: new Date(),
        required: true,
        order: 0
      }),
      new FormDatetime({
        key: 'datetime',
        label: '日期时间',
        value: new Date(),
        required: true,
        order: 0
      }),
      new FormCheckbox({
        key: 'check',
        label: '选项',
        value: [1],
        required: true,
        options: [{
          id: 1,
          name: '上海'
        }, {
          id: 2,
          name: '北京'
        }],
        order: 0
      }),
      new FormRadio({
        key: 'radio',
        label: '选项',
        value: '1',
        required: true,
        options: [{
          id: 1,
          name: '上海'
        }, {
          id: 2,
          name: '北京'
        }],
        order: 0
      }),
      new FormDropdown({
        key: 'dropdown',
        label: '选项',
        value: '1',
        required: true,
        options: [{
          id: 1,
          name: '上海'
        }, {
          id: 2,
          name: '北京'
        }],
        order: 0
      }),
      new FormText({
        key: 'text',
        label: '文本',
        value: 'ssss',
        required: true,
        order: 0
      }),
      new FormTextarea({
        key: 'textarea',
        label: '多行文版',
        value: 'ssss',
        required: true,
        order: 0
      }),
      new FormEditor({
        key: 'editor',
        label: '富文本',
        value: 'ssss',
        required: true,
        order: 0
      }),
      new FormFile({
        key: 'certificationUrl',
        label: '职称证明或医院工牌',
        value: data && data.certificationUrl || '',
        required: true,
        url: `${this.app.pci.BASE_URL}api/upload`,
        order: 6
      }),
    );

    // if (data) {
    //   forms.push(
    //     new FormText({
    //       key: 'tel',
    //       label: '手机号',
    //       value: data && data.tel || '',
    //       readonly: true,
    //       required: true,
    //       order: 0
    //     })
    //   )
    // } else {
    //   forms.push(
    //     new FormText({
    //       key: 'tel',
    //       label: '手机号',
    //       value: data && data.tel || '',
    //       required: true,
    //       order: 0
    //     }),
    //     new FormText({
    //       key: 'auditor',
    //       label: '添加人',
    //       value: '',
    //       required: true,
    //       order: 0
    //     })
    //   );
    // }
    //
    // forms.push(
    //   new FormDate({
    //     key: 'date',
    //     label: '日期',
    //     value: new Date(),
    //     required: true,
    //     validated: true,
    //     order: 1
    //   }),
    //   new FormText({
    //     key: 'name',
    //     label: '医生姓名',
    //     value: data && data.name || '',
    //     required: true,
    //     validated: true,
    //     order: 1
    //   }),
    //   new FormDropdown({
    //     key: 'hospitalId',
    //     label: '所属医院',
    //     value: data && data.hospitalId || '',
    //     required: true,
    //     options: hospitals,
    //     order: 3
    //   }),
    //   new FormDropdown({
    //     key: 'departmentId',
    //     label: '所属科室',
    //     value: data && data.departmentId || '',
    //     required: true,
    //     options: departments,
    //     order: 4
    //   }),
    //   new FormDropdown({
    //     key: 'titleId',
    //     label: '职称',
    //     value: data && data.doctorTitleId || '',
    //     required: true,
    //     options: doctorTitles,
    //     order: 5
    //   }),
    //   new FormFile({
    //     key: 'avatarUrl',
    //     label: '头像',
    //     value: data && data.avatarUrl || '',
    //     required: false,
    //     order: 2
    //   }),
    //   new FormFile({
    //     key: 'certificationUrl',
    //     label: '职称证明或医院工牌',
    //     value: data && data.certificationUrl || '',
    //     required: true,
    //     order: 6
    //   }),
    //   new FormTextarea({
    //     key: 'description',
    //     label: '医生简介',
    //     value: data && data.description || '',
    //     required: false,
    //     order: 7
    //   })
    // );

    return forms.sort((a, b) => a.order - b.order);
  }
}
