import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

import { HealthServiceService, HealthServiceFormService } from '../_service';

@Component({
  selector: 'health-service-edit',
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
export class HealthServiceEditComponent implements OnInit {

  @Input() data: any;
  @Input() enable: boolean;
  @Input() organization:any;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;
 
  healthservice:any; //第三方服务详情

  constructor(
  	private _healthServiceService: HealthServiceService,
    private _healthServiceFormService: HealthServiceFormService
  	) { }

  ngOnInit() {
  	this.setHealthServiceForm();
  }

  setHealthServiceForm(){
    if (this.data) {
    this.getHealthService().subscribe(() => {
        this.modalTitle = "编辑医生信息";
        this.formDatas = this._healthServiceFormService.setForm(this.organization,this.healthservice)}, err => {
        this.errorMessage = "啊哦！访问出错啦～请稍后再来！";
        })} 
      else {
          this.modalTitle = "新增医生信息";
          this.formDatas = this._healthServiceFormService
            .setForm(
              this.organization,
            );
        }
      }

  //查询服务详情
  getHealthService(){
  	return this._healthServiceService.getHealthService(this.data.value.serviceId)
      .map(data => {
        if (data.code === 0) {
           this.healthservice= data.data;
           this.healthservice.pictures = []
            if(this.healthservice.healthBanner){
              for(let i = 0; i < this.healthservice.healthBanner.length; i++) {
                this.healthservice.pictures.push(this.healthservice.healthBanner[i].imageUrl);
              }
            }
        }
      })
  }


   //关闭模态框
 close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }


   //提交保存信息
  getValue(data){
    //图片转换
      data.healthBanners = [];
      if(data.pictures){
        for(let i = 0; i < data.pictures.length; i++) {
          data.healthBanners[i] = {};
          data.healthBanners[i].imageUrl = data.pictures[i];
        }
        delete data.pictures;
      }
      
    if(this.data){
      this._healthServiceService.healthServiceUpdate(data)
      .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("服务修改成功！");
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
      this._healthServiceService.healthServiceCreate(data)
      .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("新增服务成功！");
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

}
