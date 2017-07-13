import { Component, OnInit } from '@angular/core';
import { VersionControlFormService } from '../_service/version-control-form.service';
import { VersionControlService } from '../_service/version-control.service';

@Component({
  selector: 'app-version-control-edit',
  template: `
    <h1>version control</h1>
  `,
})
export class VersionControlEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();
  // @Output() handleEmit: EventEmitter < any > = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private _versionControlFormService: VersionControlFormService,
    private _versionControlService: VersionControlService
  ) {
  }

  ngOnInit() {
    // this.setversionControlForm();
  }

  // setversionControlForm() {
  //   if (this.data) {
  //     this.modalTitle = "编辑版本信息";
  //     this.formDatas = this._versionControlFormService.setForm(this.data);
  //   } else {
  //     this.modalTitle = "新增版本信息";
  //     this.formDatas = this._versionControlFormService.setForm();
  //   }
  // }
  //
  // getValue(data) {
  //   if (this.data) {
  //     this._versionControlService.versionControlUpdate(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.close();
  //             this.handleEmit.emit("修改成功！");
  //           } else {
  //             this.errorMessage = "修改失败～请重新操作！";
  //           };
  //         }), err => {
  //         this.errorMessage = "啊哦！接口访问出错啦～";
  //       }
  //   } else {
  //     this._versionControlService.versionControlCreate(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.close();
  //             this.handleEmit.emit("添加成功！");
  //           } else {
  //             this.errorMessage = "添加失败～请重新操作！";
  //           }
  //         }), err => {
  //         this.errorMessage = "啊哦！接口访问出错啦～";
  //       }
  //   }
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
