import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BasicServiceService, BasicServiceFormService } from '../_service';

@Component({
  selector: 'app-basic-service-edit',
  template: `
  <edit-component 
    *ngIf="formDatas"
    [modalTitle]="modalTitle" 
    [formDatas]="formDatas" 
    [errorMessage]="errorMessage"
    (valueEmmit)="getValue($event)"
    (closeEmmit)="close()"
  >
  </edit-component>
  `,
})
export class BasicServiceEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _basicServiceService: BasicServiceService,
    private _basicServiceFormService: BasicServiceFormService
  ) {}

  ngOnInit() {
    this.setDoctorForm();
  }

  setDoctorForm() {
    if (this.data) {
      this.modalTitle = "编辑基础服务";
      this.formDatas = this._basicServiceFormService.setForm(this.data);
    }
  }

  getValue(data) {
    data.numbers = data.numbers.join(',');
    if (this.data) {
      this._basicServiceService.basicServiceUpdate(data)
        .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("基础服务修改成功！");
              this.close();
            } else {
              if (data.msg) {
                this.errorMessage = data.msg;
              } else {
                this.errorMessage = "操作失败！";
              }
            }
          }, err => {
            this.errorMessage = "啊哦！访问出错啦～";
          })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
