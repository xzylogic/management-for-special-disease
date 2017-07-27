import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DepartmentService } from './_service/department.service';
import { DepartmentTableService } from './_service/department-table.service';
import { Department } from './_entity/department.entity';
import { ERRMSG } from '../../_store/static';
import { DialogOptions } from '../../../libs/dmodal/dialog/dialog.entity';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  containerConfig: ContainerConfig;
  departmentTable: TableOption;
  @select(['department', 'tab']) tab: Observable<number>;
  @select(['department', 'page']) page: Observable<Array<number>>;
  departmentId: number;
  constructor(
    @Inject('action') private action,
    private departmentService: DepartmentService,
    private departmentTableService: DepartmentTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('departmentService', new Department());
  }

  ngOnInit() {
    this.containerConfig = this.departmentService.departmentConfig();
    this.departmentTable = new TableOption({
      titles: this.departmentTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getDepartment();
    });
  }

  getDepartment() {
    this.departmentService.getDepartments()
      .subscribe(res => {
        this.departmentTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.departmentTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.departmentTable.totalPage = res.data.totalPages;
          this.departmentTable.lists = res.data;
        } else {
          this.departmentTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.departmentTable.loading = false;
        console.log(err);
        this.departmentTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    const config = new DialogOptions({
      title: `新增科室`,
      message: '',
      buttons: [{
        key: 'toconfirm',
        value: '确定',
        color: 'primary'
      }, {
        key: 'tocancel',
        value: '取消',
        color: ''
      }],
      forms: [{
        key: 'name',
        label: '',
        value: ''
      }]
    });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'toconfirm' && result.value[0]) {
          const obj: any = {name: result.value[0].value};
          this.new(obj);
        }
      });
  }

  gotoHandle(res) {
    const department = <Department>res.value;
    this.departmentId = department.id;
    if (res.key === 'editDepartment') {
      const config = new DialogOptions({
        title: `编辑科室`,
        message: '',
        buttons: [{
          key: 'toconfirm',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }],
        forms: [{
          key: 'name',
          label: '',
          value: department.name
        }]
      });
        ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
          if (result.key === 'toconfirm' && result.value[0]) {
            const obj: any = {id: department.id, name: result.value[0].value};
            this.edit(obj);
          }
        });
    }
  }

  edit(value) {
    this.departmentService.departmentEdit(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDepartment();
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  new(value) {
    this.departmentService.departmentCreate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDepartment();
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}
