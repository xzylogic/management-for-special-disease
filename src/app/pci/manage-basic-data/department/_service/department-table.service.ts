import { Injectable } from '@angular/core';
import { TableTitle, ControlType } from '../../../../libs';

@Injectable()
export class DepartmentTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '科室名称',
        key: 'name'
      }),
      new TableTitle({
        name: '编辑',
        key: 'editDepartment',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
}
