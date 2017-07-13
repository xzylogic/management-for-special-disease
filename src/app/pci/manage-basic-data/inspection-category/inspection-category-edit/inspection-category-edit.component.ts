import { Component, OnInit } from '@angular/core';
import { InspectionCategoryService } from '../_service/inspection-category.service';
import { InspectionCategoryFormService } from '../_service/inspection-category-form.service';

@Component({
  selector: 'app-inspection-category-edit',
  templateUrl: './inspection-category-edit.component.html'
})
export class InspectionCategoryEditComponent implements OnInit {

  constructor(
    private _inspectionCategoryService: InspectionCategoryService,
    private _inspectionCategoryFormService: InspectionCategoryFormService
  ) {
  }

  ngOnInit() {
    // this.setInspectionCategoryForm();
  }

  // setInspectionCategoryForm() {
  //   if (this.data) {
  //     this.modalTitle = "编辑检查类目";
  //     this.formDatas = this._inspectionCategoryFormService.setForm(this.data);
  //   } else {
  //     this.modalTitle = "新增检查类目";
  //     this.formDatas = this._inspectionCategoryFormService.setForm();
  //   }
  // }
  //
  // getValue(value) {
  //   // console.log(value);
  //   if (this.data) {
  //     this._inspectionCategoryService.inspectionCategoryEdit(value)
  //       .subscribe(
  //         res => {
  //           if (res.code === 0) {
  //             this.handleEmit.emit("检查类目修改成功！");
  //             this.close();
  //           } else {
  //             if(res.msg) {
  //               this.errorMessage = res.msg;
  //             } else {
  //               this.errorMessage = "保存失败～请重新操作！";
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = "啊哦！接口访问出错啦～";
  //         })
  //
  //   } else {
  //     this._inspectionCategoryService.inspectionCategoryCreate(value)
  //       .subscribe(
  //         res => {
  //           if (res.code === 0) {
  //             this.handleEmit.emit("检查类目保存成功！");
  //             this.close();
  //           } else {
  //             if(res.msg) {
  //               this.errorMessage = res.msg;
  //             } else {
  //               this.errorMessage = "保存失败～请重新操作！";
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = "啊哦！接口访问出错啦～";
  //         })
  //   }
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
