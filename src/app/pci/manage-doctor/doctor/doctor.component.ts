import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { DoctorService } from './_service/doctor.service';
import { DoctorTableService } from './_service/doctor-table.service';
import { Doctor } from './_entity/doctor.entity';
import {
  TableOption, ContainerConfig, DialogOptions,
  ImageDialog, ActionDialog, HintDialog, MessageDialog
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  containerConfig: ContainerConfig;
  auditedTable: TableOption;
  auditingTable: TableOption;
  failureTable: TableOption;
  @select(['doctor', 'tab']) tab: Observable<number>;
  @select(['doctor', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('doctor', new Doctor());
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorConfig();
    this.auditedTable = new TableOption({
      titles: this.doctorTableService.setDoctorAuditedTitles(),
      ifPage: true
    });
    this.auditingTable = new TableOption({
      titles: this.doctorTableService.setDoctorAuditingTitles(),
      ifPage: true
    });
    this.failureTable = new TableOption({
      titles: this.doctorTableService.setDoctorFailureTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
  }

  reset0() {
    this.auditedTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getAuditedDoctors(page[0]);
    });
  }

  reset1() {
    this.auditingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getAuditingDoctors(page[1]);
    });
  }

  reset2() {
    this.failureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getFailureDoctors(page[2]);
    });
  }

  getAuditedDoctors(page: number) {
    this.action.pageChange('doctor', [page, this.auditingTable.currentPage, this.failureTable.currentPage]);
    this.auditedTable.reset(page);
    this.doctorService.getAuditedDoctors(
      this.auditedTable.queryKey, page, this.auditedTable.size)
      .subscribe(res => {
        this.auditedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.auditedTable.totalPage = res.data.totalPages;
          this.formatDoctor(res.data.content, true);
          this.auditedTable.lists = res.data.content;
        } else {
          this.auditedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.auditedTable.loading = false;
        console.log(err);
        this.auditedTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getAuditingDoctors(page: number) {
    this.action.pageChange('doctor', [this.auditedTable.currentPage, page, this.failureTable.currentPage]);
    this.auditingTable.reset(page);
    this.doctorService.getAuditingDoctors(
      this.auditingTable.queryKey, page, this.auditingTable.size)
      .subscribe(res => {
        this.auditingTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditingTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.auditingTable.totalPage = res.data.totalPages;
          this.formatDoctor(res.data.content, false);
          this.auditingTable.lists = res.data.content;
        } else {
          this.auditingTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.auditingTable.loading = false;
        console.log(err);
        this.auditingTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getFailureDoctors(page: number) {
    this.action.pageChange('doctor', [this.auditedTable.currentPage, this.auditingTable.currentPage, page]);
    this.failureTable.reset(page);
    this.doctorService.getFailureDoctors(
      this.failureTable.queryKey, page, this.failureTable.size)
      .subscribe(res => {
        this.failureTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.failureTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.failureTable.totalPage = res.data.totalPages;
          this.formatDoctor(res.data.content, false);
          this.failureTable.lists = res.data.content;
        } else {
          this.failureTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.failureTable.loading = false;
        console.log(err);
        this.failureTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  formatDoctor(list: Array<any>, state: boolean) {
    list.forEach(data => {
      data.state = state;
      data.hospitalId = data.hospital && data.hospital.id || '';
      data.hospitalName = data.hospital && data.hospital.name || '';
      data.departmentId = data.department && data.department.id || '';
      data.departmentName = data.department && data.department.name || '';
      data.doctorTitleId = data.doctorTitle && data.doctorTitle.id || '';
      data.doctorTitleName = data.doctorTitle && data.doctorTitle.name || '';
    })
  }

  newData() {
    this.action.dataChange('doctor', new Doctor());
    this.router.navigate(['/doctor/edit']);
  }

  gotoHandle(res) {
    // console.log(res);
    const doctor = <Doctor>res.value;
    if (res.key === 'editAudited' || res.key === 'editAuditing') {
      this.action.dataChange('doctor', doctor);
      this.router.navigate(['/doctor/edit']);
    }
    if (res.key === 'integral') {
      // this.action.dataChange('doctor', doctor);
      this.router.navigate(['/doctor/integral'], {queryParams: {id: doctor.id}});
    }
    if (res.key === 'certificationUrl') {
      ImageDialog(doctor.name, doctor.avatarUrl, this.dialog);
    }
    if (res.key === 'failureReason') {
      MessageDialog('拒绝理由', doctor.failureReason, this.dialog);
    }
    if (res.key === 'pass') {
      const config = new DialogOptions({
        title: `您确定要审核通过医生${doctor.name}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '通过',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'topass') {
          this.toPassAuditing(doctor.id);
        }
      });
    }
    if (res.key === 'refuse') {
      const config = new DialogOptions({
        title: `您确定要拒绝医生${doctor.name}的审核？`,
        message: '',
        buttons: [{
          key: 'torefuse',
          value: '拒绝',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }],
        forms: [{
          key: 'message',
          label: '拒绝理由',
          value: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'torefuse' && result.value[0]) {
          this.toRefuseAuditing(doctor.id, result.value[0].value);
        }
      });
    }
  }

  toPassAuditing(id) {
    this.doctorService.doctorAuditingSuccess(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  toRefuseAuditing(id, message) {
    this.doctorService.doctorAuditingFailure(id, message)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  toSendMessage() {
    this.router.navigate(['/doctor/message']);
  }

  change(index) {
    this.action.tabChange('doctor', index);
  }
}
