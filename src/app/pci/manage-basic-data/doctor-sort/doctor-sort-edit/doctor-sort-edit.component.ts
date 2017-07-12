import { Component, OnInit } from '@angular/core';

import { DoctorSortService } from '../_service/doctor-sort.service';
import { DoctorSortFormService } from '../_service/doctor-sort-form.service';

@Component({
  selector: 'app-doctor-sort-edit',
  templateUrl: './doctor-sort-edit.component.html'
})
export class DoctorSortEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter<any> = new EventEmitter();
  // @Output() handleEmit: EventEmitter<any> = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private _doctorSortService: DoctorSortService,
    private _doctorSortFormService: DoctorSortFormService
  ) {
  }

  ngOnInit() {
    this.setDoctorSortForm();
  }

  setDoctorSortForm() {
    // this.modalTitle = '修改医生排序';
    // this.formDatas = this._doctorSortFormService.setForm(this.data.value);
  }

  // 提交保存信息
  getValue(data) {
    // if (this.data) {
    //   this._doctorSortService.doctorRankEdit(data)
    //     .subscribe(
    //       data => {
    //         if (data.code === 0) {
    //           this.handleEmit.emit('修改医生排序成功！');
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
