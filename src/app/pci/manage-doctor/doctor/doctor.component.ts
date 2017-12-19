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
import { ERRMSG, AOA } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  auditingTable: TableOption;
  failureTable: TableOption;
  @select(['doctor', 'tab']) tab: Observable<number>;
  @select(['doctor', 'page']) page: Observable<Array<number>>;
  count: number;

  constructor(
    @Inject('action') private action,
    @Inject('common') private common,
    @Inject('nav') private navService,
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorConfig();
    this.userTable = new TableOption({
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
    this.userTable.queryKey = '';
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
    this.userTable.reset(page);
    this.doctorService.getAuditedDoctors(
      this.userTable.queryKey, page, this.userTable.size)
      .subscribe(res => {
        this.userTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.userTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.userTable.totalPage = res.data.totalPages;
          this.formatDoctor(res.data.content, true);
          this.userTable.lists = res.data.content;
        } else {
          this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.userTable.loading = false;
        console.log(err);
        this.userTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getAuditingDoctors(page: number) {
    this.action.pageChange('doctor', [this.userTable.currentPage, page, this.failureTable.currentPage]);
    this.auditingTable.reset(page);
    this.doctorService.getAuditingDoctors(
      this.auditingTable.queryKey, page, this.auditingTable.size)
      .subscribe(res => {
        this.auditingTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditingTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.count = res.data.totalElements;
          this.navService.setCount(this.count, 'doctorgroup', 'doctor');
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
    this.action.pageChange('doctor', [this.userTable.currentPage, this.auditingTable.currentPage, page]);
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
      delete data.hospital;
      delete data.department;
      delete data.doctorTitle;
    })
  }

  newData() {
    this.action.dataChange('doctor', new Doctor());
    this.router.navigate(['/doctor/edit']);
  }

  gotoHandle(res) {
    const doctor = <Doctor>res.value;
    if (res.key === 'editAudited' || res.key === 'editAuditing') {
      this.action.dataChange('doctor', doctor);
      this.router.navigate(['/doctor/edit']);
    }
    if (res.key === 'integral') {
      this.router.navigate(['/doctor/integral'], {queryParams: {id: doctor.id}});
    }
    if (res.key === 'serviceDetail') {
      this.router.navigate(['/doctor/service-detail'], {queryParams: {id: doctor.id}});
    }
    if (res.key === 'serviceList') {
      this.router.navigate(['/doctor/service-list'], {queryParams: {id: doctor.id}});
    }
    if (res.key === 'certificationUrl') {
      ImageDialog(doctor.name, doctor.certificationUrl, this.dialog);
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
        if (result && result.key === 'topass') {
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
        if (result && result.key === 'torefuse' && result.value[0]) {
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

  export() {
    let exportList;
    this.doctorService.getAuditedDoctors('', 0, 99999)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
          this.formatDoctor(res.data.content, true);
          exportList = this.common.toArray(res.data.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `全程心管家医生信息列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
          saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }
}
