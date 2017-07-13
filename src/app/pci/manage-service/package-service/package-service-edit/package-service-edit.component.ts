import { Component, OnInit } from '@angular/core';
import { PackageServiceService } from '../_service/package-service.service';
import { PackageServiceFormService } from '../_service/package-service-form.service';

@Component({
  selector: 'app-package-service-edit',
  template: `
    <h1>app-package-service-edit</h1>
  `,
})
export class PackageServiceEditComponent implements OnInit {

  constructor(
    private _packageServiceService: PackageServiceService,
    private _packageServiceFormService: PackageServiceFormService
  ) {
  }

  ngOnInit() {
    // this.setPackageForm();
  }

  //  setPackageForm(){
  //  	if(this.data){
  //        this.modalTitle = "编辑套餐包";
  //        this.formDatas = this._packageServiceFormService.setForm(
  //        	this.DoctorServiceList,
  //        	this.HealthServiceList,
  //        	this.data.value
  //        	);
  //      }else{
  //        this.modalTitle = "新增套餐包";
  //        this.formDatas = this._packageServiceFormService.setForm(
  //        	this.DoctorServiceList,
  //        	this.HealthServiceList
  //        	);
  //      }
  //  }
  //
  //  //提交保存信息
  //  getValue(data){
  //    if(this.data){
  //      this._packageServiceService.packageServiceSave(data)
  //      .subscribe(
  //          data => {
  //            if (data.code === 0) {
  //              this.handleEmit.emit("套餐包修改成功！");
  //              this.close();
  //            } else {
  //              if (data.msg) {
  //                this.errorMessage = data.msg;
  //              } else {
  //                this.errorMessage = "操作失败！";
  //              }
  //            }
  //          }, err => {
  //            this.errorMessage = "啊哦！访问出错啦～";
  //          })
  //    }else{
  //      this._packageServiceService.packageServiceSave(data)
  //      .subscribe(
  //          data => {
  //            if (data.code === 0) {
  //              this.handleEmit.emit("新增套餐包成功！");
  //              this.close();
  //            } else {
  //              if (data.msg) {
  //                this.errorMessage = data.msg;
  //              } else {
  //                this.errorMessage = "操作失败！";
  //              }
  //            }
  //          }, err => {
  //            this.errorMessage = "啊哦！访问出错啦～";
  //          })
  //    }
  //  }
  //
  // //关闭模态框
  // close() {
  //    this.enable = !this.enable;
  //    this.enableChange.emit(this.enable);
  //  }
}
