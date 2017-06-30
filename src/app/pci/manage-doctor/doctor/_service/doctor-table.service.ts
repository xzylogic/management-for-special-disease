import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DoctorTableService {

  setDoctorAuditedTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '头像',
        key: 'avatarUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospitalName'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'departmentName'
      }),
      new TableTitle({
        name: '职称',
        key: 'doctorTitleName'
      }),
      new TableTitle({
        name: '职称证明和医院工牌',
        key: 'certificationUrl',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '推荐下载',
        key: 'downloadCount'
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditor'
      }),
      new TableTitle({
        name: '审核时间',
        key: 'auditDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'integral',
        controlType: ControlType.button,
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAudited',
        controlType: ControlType.button,
        minwidth: 65
      })
    ];
    return Titles;
  }

}
