import { Injectable } from '@angular/core';

import { ControlType, TableTitle } from '../../../../libs';

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
        option: '查看',
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
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'integral',
        option: '查看',
        controlType: ControlType.button,
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAudited',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }

  setDoctorAuditingTitles() {
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
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '提交时间',
        key: 'auditorDate',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAuditing',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '通过',
        key: 'pass',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '拒绝',
        key: 'refuse',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  setDoctorFailureTitles() {
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
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '审核人',
        key: 'auditor'
      }),
      new TableTitle({
        name: '审核时间',
        key: 'auditorDate',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '拒绝理由',
        key: 'failureReason',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '编辑',
        key: 'editAuditing',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  setIntegralTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '剩余积分',
        key: 'remainingIntegral'
      }),
      new TableTitle({
        name: '项目',
        key: 'content'
      }),
      new TableTitle({
        name: '明细',
        key: 'integralTransaction'
      })
    ];
    return Titles;
  }
}
