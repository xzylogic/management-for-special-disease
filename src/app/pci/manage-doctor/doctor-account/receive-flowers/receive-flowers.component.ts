import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorAccountService, DoctorAccountTableService } from '../_service';

@Component({
  selector: 'app-receive-flowers',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <div *ngIf="!receiveFlowersTable.lists&&receiveFlowersTable.loading">Loading...</div>
      <div *ngIf="receiveFlowersTable.lists">
        <dynamic-table [titles]="receiveFlowersTable.titles" [lists]="receiveFlowersTable.lists" (handleEmmit)="gotoHandle($event)"></dynamic-table>
        <div class="table-nav" style="text-align: right">
          <page-menu [totalPages]="receiveFlowersTable.totalPage" [currentPage]="receiveFlowersTable.currentPage" (pageEmitter)="getReceiveFlowers($event)"></page-menu>
        </div>
      </div>
      <div *ngIf="!receiveFlowersTable.lists&&!receiveFlowersTable.loading" class="error-message">
        <p>{{receiveFlowersTable.errorMessage}}</p>
        <button *ngIf="receiveFlowersTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class ReceiveFlowersComponent implements OnInit {
  modalTitle: string = '收到鲜花';
  receiveFlowersTable: TableOption = new TableOption();

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService
  ) {}

  ngOnInit() {
    this.getReceiveFlowersTitles();
    if (this.data) {
      this.getReceiveFlowers(0);
    } else {
      this.receiveFlowersTable.errorMessage = "空空如也～";
    }
  }

  refresh() {
    if (this.data) {
      this.receiveFlowersTable.loading = true;
      this.getReceiveFlowers(0);
    } else {
      this.receiveFlowersTable.errorMessage = "空空如也～";
    }
  }

  getReceiveFlowersTitles() {
    this.receiveFlowersTable.titles = this._doctorAccountTableService.setIncomeDetailTitles();
  }

  getReceiveFlowers(page: number) {
    this.receiveFlowersTable.currentPage = page;
    this._doctorAccountService.getDetailList(this.data.id, page, this.receiveFlowersTable.size)
      .subscribe(
        data => {
          this.receiveFlowersTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.receiveFlowersTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.receiveFlowersTable.totalPage = data.data.totalPages;
            this.receiveFlowersTable.lists = data.data.content;
          }
        }, err => {
          this.receiveFlowersTable.loading = false;
          this.receiveFlowersTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
