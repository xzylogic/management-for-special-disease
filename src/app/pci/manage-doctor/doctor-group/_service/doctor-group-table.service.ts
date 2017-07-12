import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class DoctorGroupTableService {

  setTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '医生小组名称',
        key: 'groupName'
      }),
      new TableTitle({
        name: '组长',
        key: 'name'
      }),
      new TableTitle({
        name: '管理员',
        key: 'managerNames'
      }),
      new TableTitle({
        name: '小组成员',
        key: 'memberNames'
      }),
      new TableTitle({
        name: '开通服务',
        key: 'serviceNames'
      }),
      new TableTitle({
        name: '已服务',
        key: 'serviceCount'
      }),
      new TableTitle({
        name: '正在服务',
        key: 'servicingCount'
      }),
      new TableTitle({
        name: '成立时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: 'showTitle',
        minwidth: 65
      }),
      new TableTitle({
        name: '服务明细',
        key: 'show',
        controlType: 'showTitle',
        minwidth: 100
      })
    ];

    return Titles;
  }

}
