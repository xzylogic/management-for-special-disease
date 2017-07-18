import { Component, Inject, OnInit } from '@angular/core';
import { DoctorGroupService } from './_service/doctor-group.service';
import { DoctorGroupTableService } from './_service/doctor-group-table.service';
import { AuditingServiceTableService } from './_service/auditing-service-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-doctor-group',
  templateUrl: './doctor-group.component.html'
})
export class DoctorGroupComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorGroupTable: TableOption;
  auditingServiceTable: TableOption;
  @select(['doctorGroup', 'tab']) tab: Observable<number>;
  @select(['doctorGroup', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private doctorGroupService: DoctorGroupService,
    private doctorGroupTableService: DoctorGroupTableService,
    private auditingServiceTableService: AuditingServiceTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorGroupService.doctorGroupConfig();
    this.doctorGroupTable = new TableOption({
      titles: this.doctorGroupTableService.setTitles(),
      ifPage: true
    });
    this.auditingServiceTable = new TableOption({
      titles: this.auditingServiceTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.page.subscribe((page: Array<number>) => {
      this.getDoctorGroups(page[0]);
    });
  }

  reset1() {
    this.page.subscribe((page: Array<number>) => {
      this.getAuditingServices(page[1]);
    });
  }

  getDoctorGroups(page: number) {
    this.action.pageChange('doctorGroup', [page, this.auditingServiceTable.currentPage]);
    this.doctorGroupTable.reset(page);
    this.doctorGroupService.getDoctorGroups(page, this.doctorGroupTable.size)
      .subscribe(
        res => {
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.doctorGroupTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.doctorGroupTable.totalPage = res.data.totalPages;
            this.doctorGroupTable.lists = res.data.content;
          } else {
            this.doctorGroupTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.doctorGroupTable.loading = false;
          console.log(err);
          this.doctorGroupTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getAuditingServices(page: number) {
    this.action.pageChange('doctorGroup', [this.doctorGroupTable.currentPage, page]);
    this.auditingServiceTable.reset(page);
    this.doctorGroupService.getAuditingServices(page, this.auditingServiceTable.size)
      .subscribe(
        res => {
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.auditingServiceTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.auditingServiceTable.totalPage = res.data.totalPages;
            this.auditingServiceTable.lists = res.data.content;
          } else {
            this.auditingServiceTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.auditingServiceTable.loading = false;
          console.log(err);
          this.auditingServiceTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  gotoHandle(data) {
    console.log(data);
    if (data.key === 'show') {
      // this.doctorGroup = data.value;
      // this.enableDetail = true;
    }
    if (data.key === 'edit') {
      // this.doctorGroup = data.value;
      // this.enableEdit = true;
    }
    if (data.key === 'auditing') {
      // this.processData = data.value;
      // this.enableProcess = true;
    }
  }

  //
  // process() {
  //   this._doctorGroupService.serviceAuditingSuccess(this.processData.id)
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.message = "操作成功～";
  //           this.enableProcess = false;
  //           this.enableShow = true;
  //           this.refresh();
  //         } else {
  //           if (data.msg) {
  //             this.message = data.msg;
  //           } else {
  //             this.message = "操作失败～";
  //           }
  //           this.enableProcess = false;
  //           this.enableShow = true;
  //         }
  //       }, err => {
  //         this.message = "连接服务器出错";
  //         this.enableProcess = false;
  //         this.enableShow = true;
  //       })
  // }
  //
  // processCancel() {
  //   this.processData = null;
  //   this.enableProcess = false;
  // }

  change(index) {
    this.action.tabChange('doctor', index);
  }
}
