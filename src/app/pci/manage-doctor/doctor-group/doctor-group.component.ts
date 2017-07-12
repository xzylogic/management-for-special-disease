import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../entities';

import {
  DoctorGroupService,
  DoctorGroupTableService,
  AuditingServiceTableService
} from './_service';
import { SidebarService } from "../../_services/sidebar.service";

@Component({
  selector: 'app-doctor-group',
  templateUrl: './doctor-group.component.html'
})
export class DoctorGroupComponent implements OnInit {
  title = '医生小组管理';
  subTitle = '医生小组列表';

  doctorGroupTable: TableOption;
  auditingServiceTable: TableOption;

  auditingServiceCount: number;

  doctorGroup: any;
  enableDetail: boolean;
  enableEdit: boolean;

  titleShow: string;
  message: string;
  enableShow: boolean;

  processData: any;
  enableProcess: boolean;

  constructor(
    private _doctorGroupService: DoctorGroupService,
    private _doctorGroupTableService: DoctorGroupTableService,
    private _auditingServiceTableService: AuditingServiceTableService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.doctorGroupTable = new TableOption();
    this.auditingServiceTable = new TableOption();
    this.getDoctorGroupTitles();
    this.getAuditingServiceTitles();
    this.getDoctorGroups(0);
    this.getAuditingServices(0);
    this.getAuditingServiceCount();
  }

  getDoctorGroupTitles() {
    this.doctorGroupTable.titles = this._doctorGroupTableService.setTitles();
  }

  getDoctorGroups(page: number) {
    this.doctorGroupTable.currentPage = page;
    this._doctorGroupService.getDoctorGroups(page, this.doctorGroupTable.size)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.doctorGroupTable.totalPage = data.data.totalPages;
            this.doctorGroupTable.lists = data.data.content;
          }
        }, err => {
          this.doctorGroupTable.loading = false;
          this.doctorGroupTable.errorMessage = "啊哦～接口访问出错了！";
        })
  }

  getAuditingServiceTitles() {
    this.auditingServiceTable.titles = this._auditingServiceTableService.setTitles();
  }

  getAuditingServices(page: number) {
    this.auditingServiceTable.currentPage = page;
    this._doctorGroupService.getAuditingServices(page, this.auditingServiceTable.size)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.auditingServiceTable.totalPage = data.data.totalPages;
            this.auditingServiceTable.lists = data.data.content;
          }
        }, err => {
          this.auditingServiceTable.loading = false;
          this.auditingServiceTable.errorMessage = "啊哦～接口访问出错了！";
        })
  }

  getAuditingServiceCount() {
    this._doctorGroupService.getAuditingServiceCount()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.auditingServiceCount = data.data;
            this._sidebarService.setCount(this.auditingServiceCount, 'doctorgroup', 'doctorgroup');
          }
        })
  }

  gotoHandle(data) {
    if (data.key === 'show') {
      this.doctorGroup = data.value;
      this.enableDetail = true;
    } else if (data.key === 'edit') {
      this.doctorGroup = data.value;
      this.enableEdit = true;
    } else if (data.key === 'auditing') {
      this.processData = data.value;
      this.enableProcess = true;
    }
  }

  handleSuccess(data) {
    this.titleShow = '提示信息';
    this.message = data;
    this.enableShow = true;
    this.refresh();
  }

  process() {
    this._doctorGroupService.serviceAuditingSuccess(this.processData.id)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.message = "操作成功～";
            this.enableProcess = false;
            this.enableShow = true;
            this.refresh();
          } else {
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "操作失败～";
            }
            this.enableProcess = false;
            this.enableShow = true;
          }
        }, err => {
          this.message = "连接服务器出错";
          this.enableProcess = false;
          this.enableShow = true;
        })
  }

  processCancel() {
    this.processData = null;
    this.enableProcess = false;
  }

}
