import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorGroupService, ServiceDetailTableService } from '../_service';

@Component({
  selector: 'app-service-detail',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <div *ngIf="!serviceDetailTable.lists&&serviceDetailTable.loading">Loading...</div>
      <div *ngIf="serviceDetailTable.lists">
        <dynamic-table [titles]="serviceDetailTable.titles" [lists]="serviceDetailTable.lists" (handleEmmit)="gotoHandle($event)"></dynamic-table>
        <div class="table-nav" style="text-align: right">
          <page-menu [totalPages]="serviceDetailTable.totalPage" [currentPage]="serviceDetailTable.currentPage" (pageEmitter)="getIncomeDetail($event)"></page-menu>
        </div>
      </div>
      <div *ngIf="!serviceDetailTable.lists&&!serviceDetailTable.loading" class="error-message">
        <p>{{serviceDetailTable.errorMessage}}</p>
        <button *ngIf="serviceDetailTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class ServiceDetailComponent implements OnInit {
  modalTitle: string = '服务明细';
  serviceDetailTable: TableOption = new TableOption();

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _doctorGroupService: DoctorGroupService,
    private _serviceDetailTableService: ServiceDetailTableService
  ) {}

  ngOnInit() {
    this.getIncomeDetailTitles();
    if (this.data) {
      this.getIncomeDetail(0);
    } else {
      this.serviceDetailTable.errorMessage = "空空如也～";
    }
  }

  refresh() {
    if (this.data) {
      this.serviceDetailTable.loading = true;
      this.getIncomeDetail(0);
    } else {
      this.serviceDetailTable.errorMessage = "空空如也～";
    }
  }

  getIncomeDetailTitles() {
    this.serviceDetailTable.titles = this._serviceDetailTableService.setTitles();
  }

  getIncomeDetail(page: number) {
    this.serviceDetailTable.currentPage = page;
    this._doctorGroupService.getServiceDetails(this.data.id, page, this.serviceDetailTable.size)
      .subscribe(
        data => {
          this.serviceDetailTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.serviceDetailTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.serviceDetailTable.totalPage = data.data.totalPages;
            this.serviceDetailTable.lists = data.data.content;
          }
        }, err => {
          this.serviceDetailTable.loading = false;
          this.serviceDetailTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
