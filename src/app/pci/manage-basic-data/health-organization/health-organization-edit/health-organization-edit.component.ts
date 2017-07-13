import { Component, OnInit } from '@angular/core';

import { HealthOrganizationService } from '../_service/health-organization.service';
import { HealthOrganizationFormService } from '../_service/health-organization-form.service';

@Component({
  selector: 'app-health-organization-edit',
  templateUrl: './health-organization-edit.component.html'
})
export class HealthOrganizationEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter<any> = new EventEmitter();
  // @Output() handleEmit: EventEmitter<any> = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private _healthOrganizationService: HealthOrganizationService,
    private _healthOrganizationFormService: HealthOrganizationFormService
  ) {
  }

  ngOnInit() {
    // this.setHealthOrganizationForm();
  }

// // 编辑和新增机构
//   setHealthOrganizationForm() {
//     if (this.data) {
//       this.modalTitle = '编辑机构';
//       this.formDatas = this._healthOrganizationFormService.setForm(this.data.value);
//     } else {
//       this.modalTitle = '新增机构';
//       this.formDatas = this._healthOrganizationFormService.setForm();
//     }
//   }
//
//   //提交保存信息
//   getValue(data) {
//     if (this.data) {
//       this._healthOrganizationService.healthOrganizationEdit(data)
//         .subscribe(
//           data => {
//             if (data.code === 0) {
//               this.handleEmit.emit('第三方机构修改成功！');
//               this.close();
//             } else {
//               if (data.msg) {
//                 this.errorMessage = data.msg;
//               } else {
//                 this.errorMessage = '操作失败！';
//               }
//             }
//           }, err => {
//             this.errorMessage = '啊哦！访问出错啦～';
//           })
//     } else {
//       this._healthOrganizationService.healthOrganizationCreate(data)
//         .subscribe(
//           data => {
//             if (data.code === 0) {
//               this.handleEmit.emit('新增第三方机构成功！');
//               this.close();
//             } else {
//               if (data.msg) {
//                 this.errorMessage = data.msg;
//               } else {
//                 this.errorMessage = '操作失败！';
//               }
//             }
//           }, err => {
//             this.errorMessage = '啊哦！访问出错啦～';
//           })
//     }
//   }
//
// //关闭模态框
//   close() {
//     this.enable = !this.enable;
//     this.enableChange.emit(this.enable);
//   }
}
