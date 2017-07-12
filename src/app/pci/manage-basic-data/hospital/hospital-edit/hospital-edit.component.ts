import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

import { HospitalService, HospitalFormService } from '../_service';

@Component({
  selector: 'hospital-edit',
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
export class HospitalEditComponent implements OnInit {

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
  	private _hospitalService: HospitalService,
    private _hospitalFormService: HospitalFormService
  	) { }

  ngOnInit() {
  	this.setHospitalForm();
  }

  setHospitalForm(){
  	if(this.data){
        this.modalTitle = "编辑医院";
        this.formDatas = this._hospitalFormService.setHospitalForm(this.data.value);
      }else{
        this.modalTitle = "新增医院";
        this.formDatas = this._hospitalFormService.setHospitalForm();
      }
  }

     //提交保存信息
  getValue(data){
    if(this.data){
      this._hospitalService.hospitalEdit(data)
      .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("医院修改成功！");
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
    }else{
      this._hospitalService.hospitalCreate(data)
      .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("新增医院成功！");
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


 //关闭模态框
 close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
