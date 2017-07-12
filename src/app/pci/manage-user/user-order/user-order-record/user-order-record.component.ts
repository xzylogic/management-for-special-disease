import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { UserOrderService, ServiceRecordFormService, ServiceRecordTableService } from '../_service';

@Component({
  selector: 'app-user-order-record',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <dynamic-form *ngIf="orderRecordForms" [formDatas]="orderRecordForms" (formValues)="getValues($event)"></dynamic-form>
      <div *ngIf="!errorMessage">{{errorMessage}}</div>
      <div *ngIf="!orderRecordTable.lists&&orderRecordTable.loading">Loading...</div>
      <div *ngIf="orderRecordTable.lists">
        <dynamic-table [titles]="orderRecordTable.titles" [lists]="orderRecordTable.lists" (handleEmmit)="gotoHandle($event)"></dynamic-table>
      </div>
      <div *ngIf="!orderRecordTable.lists&&!orderRecordTable.loading" class="error-message">
        <p>{{orderRecordTable.errorMessage}}</p>
        <button *ngIf="orderRecordTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class UserOrderRecordComponent implements OnInit {
  modalTitle: string = '使用情况';
  orderRecordTable: TableOption = new TableOption();
  orderRecordForms: any[];
  serviceList: any;
  errorMessage: string;

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _userOrderService: UserOrderService,
    private _serviceRecordFormService: ServiceRecordFormService,
    private _serviceRecordTableService: ServiceRecordTableService
  ) {}

  ngOnInit() {
    this.setOrderRecordForm();
    this.getOrderRecordTitles();
    if (this.data) {
      this.getOrderRecord();
    } else {
      this.orderRecordTable.errorMessage = "空空如也～";
    }
  }

  refresh() {
    if (this.data) {
      this.orderRecordTable.loading = true;
      this.getOrderRecord();
    } else {
      this.orderRecordTable.errorMessage = "空空如也～";
    }
  }

  getOrderRecordTitles() {
    this.orderRecordTable.titles = this._serviceRecordTableService.setTitles();
  }

  getOrderRecord() {
    this._userOrderService.getOrderRecordList(this.data.id)
      .subscribe(
        data => {
          this.orderRecordTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.orderRecordTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.orderRecordTable.lists = data.data;
          }
        }, err => {
          this.orderRecordTable.loading = false;
          this.orderRecordTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  setOrderRecordForm() {
    this._userOrderService.getOrderRecordServiceList(this.data.id)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.serviceList = data.data;
            this.orderRecordForms = this._serviceRecordFormService.setForm(this.serviceList);
          }
        })
  }

  getValues(data) {
    let name = '';
    this.serviceList.forEach(obj => {
      if (obj.id === parseInt(data.serviceId)) {
        name = obj.name;
      }
    })
    this._userOrderService.orderRecordCreate(data.serviceId, name)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.errorMessage = null;
            this.getOrderRecord();
          } else {
            this.errorMessage = '保存失败！';
          }
        }, err => {
          this.errorMessage = '啊哦！接口报错了～';
        })

  }

  gotoHandle(data) {
    if (data.key === 'del') {
      this._userOrderService.orderRecordDel(data.value.id)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.getOrderRecord();
            }
          })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
