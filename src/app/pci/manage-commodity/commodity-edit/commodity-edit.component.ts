import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CommodityFormService, CommodityService } from '../_service';

@Component({
  selector: 'commodity-edit',
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
export class CommodityEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _commodityFormService: CommodityFormService,
    private _commodityService: CommodityService
  ) {}

  ngOnInit() {
    this.setCommodityForm();
  }

  setCommodityForm() {
    if (this.data) {
      this.modalTitle = "编辑商品信息";
      // console.log(this.data);
      this.formDatas = this._commodityFormService.setForm(this.data);
    } else {
      this.modalTitle = "新增商品信息";
      this.formDatas = this._commodityFormService.setForm();
    }

  }

  getValue(data) {
     if(this.data){
      this._commodityService.commodityUpdate(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("修改成功！");
          }else{
            this.errorMessage = "修改失败～请重新操作！";
          };
        },err =>{
          this.errorMessage = "啊哦！接口访问出错啦～";
      })                                                       
    }else{
      this._commodityService.commodityCreate(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("添加成功！");
          }else{
            this.errorMessage = "添加失败～请重新操作！";          }
        },err =>{
          this.errorMessage = "啊哦！接口访问出错啦～";
      })
    }
  }

  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
