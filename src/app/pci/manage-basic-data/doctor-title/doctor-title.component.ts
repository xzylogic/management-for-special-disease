import { Component, Inject, OnInit } from '@angular/core';

import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorTitleService } from './_service/doctor-title.service';
import { DoctorTitleTableService } from './_service/doctor-title-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DoctorTitle } from './_entity/doctor-title.entity';
import { ERRMSG } from '../../_store/static';
import { DialogOptions } from '../../../libs/dmodal/dialog/dialog.entity';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-doctor-title',
  templateUrl: './doctor-title.component.html'
})
export class DoctorTitleComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorTitleTable: TableOption;
  @select(['doctorTitle', 'tab']) tab: Observable<number>;
  @select(['doctorTitle', 'page']) page: Observable<Array<number>>;
  doctorTitleId: number;
  constructor(
    @Inject('action') private action,
    private doctorTitleService: DoctorTitleService,
    private doctorTitleTableService: DoctorTitleTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('doctorTitleService', new DoctorTitle());
  }

  ngOnInit() {
    this.containerConfig = this.doctorTitleService.doctorTitleConfig();
    this.doctorTitleTable = new TableOption({
      titles: this.doctorTitleTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getDoctorTitle();
    });
  }

  getDoctorTitle() {
    this.doctorTitleService.getDoctorTitles()
      .subscribe(res => {
        this.doctorTitleTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.doctorTitleTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.doctorTitleTable.totalPage = res.data.totalPages;
          this.doctorTitleTable.lists = res.data;
        } else {
          this.doctorTitleTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorTitleTable.loading = false;
        console.log(err);
        this.doctorTitleTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    const config = new DialogOptions({
      title: `新增职称`,
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
    const doctorTitle = <DoctorTitle>res.value;
    this.doctorTitleId = doctorTitle.id;
    if (res.key === 'editPositionalTitle') {
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
          value: doctorTitle.name
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'toconfirm' && result.value[0]) {
          const obj: any = {id: doctorTitle.id, name: result.value[0].value};
          this.edit(obj);
        }
      });
    }
  }

  edit(value) {
    this.doctorTitleService.doctorTitleEdit(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDoctorTitle();
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
    this.doctorTitleService.doctorTitleCreate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDoctorTitle();
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
