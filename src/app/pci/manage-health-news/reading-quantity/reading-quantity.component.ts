import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HealthNewsService,ReadCoefficientFormService} from '../_service';

@Component({
  selector: 'reading-quantity',
  template: `
  <edit-component 
    *ngIf="formDatas"
    [modalTitle]="modalTitle" 
    [errorMessage]="errorMessage" 
    [formDatas]="formDatas" 
    (valueEmmit)="getValue($event)"
    (closeEmmit)="close()"
  >
  </edit-component>
  `
})
export class ReadingQuantityComponent implements OnInit {
  @Input() data: any;
	@Input() enable: boolean;
	@Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas:any;
  errorMessage: string;
  constructor(
    private _healthNewsService: HealthNewsService,
    private _readCoefficientFormService: ReadCoefficientFormService
  ) {}

  ngOnInit() {
    this.ReadCoefficientForm();
  }

  ReadCoefficientForm(){
    this.modalTitle = "配置阅读量系数";
    this.formDatas = this._readCoefficientFormService.ReadCoefficientForm(this.data); 
  }

  //提交保存信息
  getValue(data){
    let formData = {
      value:''
    };
    formData.value = data.data;
    this._healthNewsService.healthNewsEdit(formData)
    .subscribe(
      data => {
        if (data.code === 0) {
          this.handleEmit.emit("配置阅读量系数成功！");
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

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}