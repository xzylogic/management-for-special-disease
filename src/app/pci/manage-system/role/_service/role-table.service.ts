import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class RoleTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '创建人',
        key: 'createBy'
      }),
      new TableTitle({
        name: '角色名称',
        key: 'name'
      }),
      new TableTitle({
        name: '是否启用',
        key: 'enable',
        controlType: ControlType.pipe,
        option: {
          key: [1, 0],
          value: ['启用', '禁用']
        }
      }),
      new TableTitle({
        name: '更新时间',
        key: 'createDate',
      }),
      new TableTitle({
        name: '操作',
        key: '',
        controlType: ControlType.buttons,
        pipe: {
          key: [0, 1],
          value: ['启用', '禁用']
        },
        option: [{
          key: 'edit',
          name: '编辑'
        }, {
          key: 'config',
          name: '角色配置'
        }, {
          key: 'enable',
          name: ''
        }
        // , {key: 'del', name: '删除'}
        ]
      })
      // new TableTitle({
      //   name: '序号',
      //   key: '',
      //   controlType: ControlType.index
      // }),
      // new TableTitle({
      //   name: '患者姓名',
      //   key: 'userName'
      // }),
      // new TableTitle({
      //   name: '手机号',
      //   key: 'tel',
      //   minwidth: 85
      // }),
      // new TableTitle({
      //   name: '用药时间',
      //   key: 'time'
      // }),
      // new TableTitle({
      //   name: '药品名称',
      //   key: 'medicationName'
      // }),
      // new TableTitle({
      //   name: '服用剂量',
      //   key: 'dosage'
      // }),
      // new TableTitle({
      //   name: '剂量单位',
      //   key: 'unit'
      // }),
      // new TableTitle({
      //   name: '创建时间',
      //   key: 'createdDate'
      // }),
      // new TableTitle({
      //   name: '状态',
      //   key: 'deleted'
      // }),
      // new TableTitle({
      //   name: '闹钟开关',
      //   key: 'remind'
      // })
    ];

    return Titles;
  }
}
