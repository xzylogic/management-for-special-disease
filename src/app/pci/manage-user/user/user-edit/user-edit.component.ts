import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserFormService, UserService } from '../_service';

@Component({
  selector: 'user-edit',
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
export class UserEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Input() hospitalList:any;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private _userFormService: UserFormService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.setUserForm();
  }

  setUserForm() {
        if (this.data) {
          this.modalTitle = "编辑患者";
          this.formDatas = this._userFormService.setForm(this.hospitalList,this.data);
        } else {
          this.modalTitle = "新增患者";
          this.formDatas = this._userFormService.setForm(this.hospitalList);
        }
      }

  getValue(data) {
    if(this.data){
      this._userService.userUpdate(data)
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
      this._userService.userCreate(data)
      .subscribe(
        data => { 
          if(data.code === 0){
            this.close();
            this.handleEmit.emit("添加成功！");
          }else{
            this.errorMessage = "添加失败～请重新操作！";          
          }
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
