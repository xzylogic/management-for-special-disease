import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomMenuService } from '../_service/custom-menu.service';
import { CustomMenuFormService } from '../_service/custom-menu-form.service';

@Component({
  selector: 'app-custom-menu-edit',
  template: `
   <h1>custom-menu-edit</h1>
    `,
})
export class CustomMenuEditComponent implements OnInit {
  //
  // @Input() data: any;
  // @Input() status: number;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();
  // @Output() handleEmit: EventEmitter < any > = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private _customMenuService: CustomMenuService,
    private _customMenuFormService: CustomMenuFormService
  ) {}

  ngOnInit() {
    // this.setDoctorTitleForm();
    // if (!this.data && this.status == 0) {
    //   this.modalTitle = '新增一级菜单';
    // }
    // if (!this.data && this.status != 0) {
    //   this.modalTitle = '新增二级菜单';
    // }
    // if (this.data && this.status == 0) {
    //   this.modalTitle = '编辑一级菜单';
    // }
    // if (this.data && this.status != 0) {
    //   this.modalTitle = '编辑二级菜单';
    // }
  }

  // setDoctorTitleForm() {
  //   if (this.data) {
  //     this.modalTitle = "编辑菜单";
  //     this.formDatas = this._customMenuFormService.setForm(this.status, this.data);
  //   } else {
  //     this.modalTitle = "新增菜单";
  //     this.formDatas = this._customMenuFormService.setForm(this.status);
  //   }
  // }
  //
  // //提交保存信息
  // getValue(data) {
  //   if (this.data) {
  //     this._customMenuService.menuUpdate(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit("菜单修改成功！");
  //             this.close();
  //           } else {
  //             if (data.msg) {
  //               this.errorMessage = data.msg;
  //             } else {
  //               this.errorMessage = "操作失败！";
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = "啊哦！访问出错啦～";
  //         })
  //   } else {
  //     this._customMenuService.menuCreate(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit("新增菜单成功！");
  //             this.close();
  //           } else {
  //             if (data.msg) {
  //               this.errorMessage = data.msg;
  //             } else {
  //               this.errorMessage = "操作失败！";
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = "啊哦！访问出错啦～";
  //     })
  //   }
  // }
  //
  // //关闭模态框
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
