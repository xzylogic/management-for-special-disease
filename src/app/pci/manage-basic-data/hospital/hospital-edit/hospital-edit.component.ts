import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../_service/hospital.service';
import { HospitalFormService } from '../_service/hospital-form.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html'
})
export class HospitalEditComponent implements OnInit {

  constructor(
    private _hospitalService: HospitalService,
    private _hospitalFormService: HospitalFormService
  ) {
  }

  ngOnInit() {
    // this.setHospitalForm();
  }

  // setHospitalForm() {
  //   if (this.data) {
  //     this.modalTitle = '编辑医院';
  //     this.formDatas = this._hospitalFormService.setHospitalForm(this.data.value);
  //   } else {
  //     this.modalTitle = '新增医院';
  //     this.formDatas = this._hospitalFormService.setHospitalForm();
  //   }
  // }
  //
  // //提交保存信息
  // getValue(data) {
  //   if (this.data) {
  //     this._hospitalService.hospitalEdit(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit('医院修改成功！');
  //             this.close();
  //           } else {
  //             if (data.msg) {
  //               this.errorMessage = data.msg;
  //             } else {
  //               this.errorMessage = '操作失败！';
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = '啊哦！访问出错啦～';
  //         })
  //   } else {
  //     this._hospitalService.hospitalCreate(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit('新增医院成功！');
  //             this.close();
  //           } else {
  //             if (data.msg) {
  //               this.errorMessage = data.msg;
  //             } else {
  //               this.errorMessage = '操作失败！';
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = '啊哦！访问出错啦～';
  //         })
  //   }
  // }
  //
  // //关闭模态框
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
