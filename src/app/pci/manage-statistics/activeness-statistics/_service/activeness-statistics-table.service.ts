import { Injectable } from '@angular/core';

import { TableTitle } from '../../../../entities';

@Injectable()
export class ActivenessStatisticsTableService {

  setUserTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '登录时间',
        key: 'loginDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '登录人',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '手术医院',
        key: 'hospital'
      }),
      new TableTitle({
        name: '手术医生',
        key: 'surgeon'
      }),
      new TableTitle({
        name: '最后手术时间',
        key: 'lastOperationDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  setDoctorTitles() {
    let Titles: TableTitle[] = [
      new TableTitle({
        name: '登录时间',
        key: 'loginDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '登录人',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospital'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'department'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitle'
      })
    ];

    return Titles;
  }

}
