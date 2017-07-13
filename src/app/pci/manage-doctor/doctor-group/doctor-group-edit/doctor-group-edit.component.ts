import { Component, OnInit } from '@angular/core';

import { DoctorGroupService } from '../_service/doctor-group.service';
import { DoctorGroupFormService } from '../_service/doctor-group-form.service';

@Component({
  selector: 'app-doctor-group-edit',
  template: `
    <h1>app-doctor-group-edit</h1>
  `,
})
export class DoctorGroupEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();
  // @Output() handleEmit: EventEmitter < any > = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private doctorGroupFormService: DoctorGroupFormService,
    private doctorGroupService: DoctorGroupService
  ) {
  }

  ngOnInit() {
    // this.setDoctorForm();
  }

  // setDoctorForm() {
  //   this.modalTitle = "编辑医生信息";
  //   if (this.data) {
  //     this.formDatas = this._doctorGroupFormService.setForm(this.data);
  //   } else {
  //     this.errorMessage = "数据错误，请重试！"
  //   }
  // }
  //
  // getValue(data) {
  //   this._doctorGroupService.doctorGroupUpdateDesc(data.id, data.description)
  //     .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.handleEmit.emit("医生信息修改成功！");
  //           this.close();
  //         } else {
  //           if (data.msg) {
  //             this.errorMessage = data.msg;
  //           } else {
  //             this.errorMessage = "操作失败！";
  //           }
  //         }
  //       }, err => {
  //         this.errorMessage = "啊哦！访问出错啦～";
  //       })
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
