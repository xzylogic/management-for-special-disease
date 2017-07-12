import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableOption } from '../../../../entities';

import { DoctorAccountService, DoctorAccountTableService } from '../_service';

@Component({
  selector: 'app-exchange-commodities',
  template: `
    <modal-full [modalTitle]="modalTitle" (closeEmmit)="close()">
      <div *ngIf="!exchangeCommoditiesTable.lists&&exchangeCommoditiesTable.loading">Loading...</div>
      <div *ngIf="exchangeCommoditiesTable.lists">
        <dynamic-table [titles]="exchangeCommoditiesTable.titles" [lists]="exchangeCommoditiesTable.lists" (handleEmmit)="gotoHandle($event)"></dynamic-table>
        <div class="table-nav" style="text-align: right">
          <page-menu [totalPages]="exchangeCommoditiesTable.totalPage" [currentPage]="exchangeCommoditiesTable.currentPage" (pageEmitter)="getExchangeCommodities($event)"></page-menu>
        </div>
      </div>
      <div *ngIf="!exchangeCommoditiesTable.lists&&!exchangeCommoditiesTable.loading" class="error-message">
        <p>{{exchangeCommoditiesTable.errorMessage}}</p>
        <button *ngIf="exchangeCommoditiesTable.errorMessage" class="ui button small" (click)="refresh()">点击刷新</button>
      </div>
    </modal-full>
  `
})
export class ExchangeCommoditiesComponent implements OnInit {
  modalTitle: string = '已兑换';
  exchangeCommoditiesTable: TableOption = new TableOption();

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();

  constructor(
    private _doctorAccountService: DoctorAccountService,
    private _doctorAccountTableService: DoctorAccountTableService
  ) {}

  ngOnInit() {
    this.getExchangeCommoditiesTitles();
    if (this.data) {
      this.getExchangeCommodities(0);
    } else {
      this.exchangeCommoditiesTable.errorMessage = "空空如也～";
    }
  }

  refresh() {
    if (this.data) {
      this.exchangeCommoditiesTable.loading = true;
      this.getExchangeCommodities(0);
    } else {
      this.exchangeCommoditiesTable.errorMessage = "空空如也～";
    }
  }

  getExchangeCommoditiesTitles() {
    this.exchangeCommoditiesTable.titles = this._doctorAccountTableService.setExchangeDetailTitles();
  }

  getExchangeCommodities(page: number) {
    this.exchangeCommoditiesTable.currentPage = page;
    this._doctorAccountService.getExchangeList(this.data.id, page, this.exchangeCommoditiesTable.size)
      .subscribe(
        data => {
          this.exchangeCommoditiesTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.exchangeCommoditiesTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.exchangeCommoditiesTable.totalPage = data.data.totalPages;
            this.exchangeCommoditiesTable.lists = data.data.content;
          }
        }, err => {
          this.exchangeCommoditiesTable.loading = false;
          this.exchangeCommoditiesTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
