import { Component, OnInit } from '@angular/core';

import { DoctorTitleService } from '../_service/doctor-title.service';
import { DoctorTitleFormService } from '../_service/doctor-title-form.service';

@Component({
  selector: 'app-doctor-title-edit',
  templateUrl: './doctor-title-edit.component.html'
})
export class DoctorTitleEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter<any> = new EventEmitter();
  // @Output() handleEmit: EventEmitter<any> = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private doctorTitleService: DoctorTitleService,
    private doctorTitleFormService: DoctorTitleFormService
  ) {
  }

  ngOnInit() {
    // this.setDoctorTitleForm();
  }

  setDoctorTitleForm() {
    // if (this.data) {
    //   this.modalTitle = '编辑职称';
    //   this.formDatas = this._doctorTitleFormService.setForm(this.data.value);
    // } else {
    //   this.modalTitle = '新增职称';
    //   this.formDatas = this._doctorTitleFormService.setForm();
    // }
  }

  // 提交保存信息
  getValue(data) {
    // if (this.data) {
    //   this._doctorTitleService.doctorTitleEdit(data)
    //     .subscribe(
    //       data => {
    //         if (data.code === 0) {
    //           this.handleEmit.emit('职称修改成功！');
    //           this.close();
    //         } else {
    //           if (data.msg) {
    //             this.errorMessage = data.msg;
    //           } else {
    //             this.errorMessage = '操作失败！';
    //           }
    //         }
    //       }, err => {
    //         this.errorMessage = '啊哦！访问出错啦～';
    //       })
    // } else {
    //   this._doctorTitleService.doctorTitleCreate(data)
    //     .subscribe(
    //       data => {
    //         if (data.code === 0) {
    //           this.handleEmit.emit('新增职称成功！');
    //           this.close();
    //         } else {
    //           if (data.msg) {
    //             this.errorMessage = data.msg;
    //           } else {
    //             this.errorMessage = '操作失败！';
    //           }
    //         }
    //       }, err => {
    //         this.errorMessage = '啊哦！访问出错啦～';
    //       })
    // }
  }
}
