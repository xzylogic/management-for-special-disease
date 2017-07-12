import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

import { NewsClassifyService, NewsClassifyFormService } from '../_service';

@Component({
  selector: 'news-classify-edit',
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
export class NewsClassifyEditComponent implements OnInit {

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;


  constructor(
  	private _newsClassifyService: NewsClassifyService,
    private _newsClassifyTableService: NewsClassifyFormService
  	) { }

  ngOnInit() {
  	this.setClassifyForm();
  }


  setClassifyForm(){
    if(this.data){
        this.modalTitle = "编辑健康资讯分类";
        this.formDatas = this._newsClassifyTableService.setForm(this.data.value);
      }else{
        this.modalTitle = "新增健康资讯分类";
        this.formDatas = this._newsClassifyTableService.setForm();
      }
  }


 //提交保存信息
  getValue(data){
    if(this.data){
      this._newsClassifyService.newsClassifyUpdate(this.data.value.id,data.name)
      .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("健康资讯分类修改成功！");
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
      this._newsClassifyService.newsClassifyCreate(data.name)
      .subscribe(
          data => {
            if (data.code === 0) {
              this.handleEmit.emit("新增健康资讯分类成功！");
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
