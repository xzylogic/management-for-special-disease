import { Component, OnInit } from '@angular/core';

import { UserService } from '../_service/user.service';
import { UserFormService } from '../_service/user-form.service';

@Component({
  selector: 'app-user-edit',
  template: `
    <h1>user edit</h1>
  `,
})
export class UserEditComponent implements OnInit {

  constructor(
    private _userFormService: UserFormService,
    private _userService: UserService
  ) {
  }

  ngOnInit() {
    // this.setUserForm();
  }

  // setUserForm() {
  //       if (this.data) {
  //         this.modalTitle = "编辑患者";
  //         this.formDatas = this._userFormService.setForm(this.hospitalList,this.data);
  //       } else {
  //         this.modalTitle = "新增患者";
  //         this.formDatas = this._userFormService.setForm(this.hospitalList);
  //       }
  //     }
  //
  // getValue(data) {
  //   if(this.data){
  //     this._userService.userUpdate(data)
  //     .subscribe(
  //       data => {
  //         if(data.code === 0){
  //           this.close();
  //           this.handleEmit.emit("修改成功！");
  //         }else{
  //           this.errorMessage = "修改失败～请重新操作！";
  //         };
  //       },err =>{
  //         this.errorMessage = "啊哦！接口访问出错啦～";
  //     })
  //   }else{
  //     this._userService.userCreate(data)
  //     .subscribe(
  //       data => {
  //         if(data.code === 0){
  //           this.close();
  //           this.handleEmit.emit("添加成功！");
  //         }else{
  //           this.errorMessage = "添加失败～请重新操作！";
  //         }
  //       },err =>{
  //         this.errorMessage = "啊哦！接口访问出错啦～";
  //     })
  //   }
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
