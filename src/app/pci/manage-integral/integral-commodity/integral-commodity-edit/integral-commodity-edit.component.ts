import { Component, OnInit } from '@angular/core';

import { IntegralCommodityFormService } from '../_service/integral-commodity-form.service';
import { IntegralCommodityService } from '../_service/integral-commodity.service';

@Component({
  selector: 'app-integral-commodity-edit',
  template: `
    <h1>integral-commodity-edit</h1>
  `,
})
export class IntegralCommodityEditComponent implements OnInit {

  constructor(
    private integralCommodityFormService: IntegralCommodityFormService,
    private integralCommodityService: IntegralCommodityService
  ) {
  }

  ngOnInit() {
    // console.log(this.data);
    // this.setIntegralCommodityForm();
  }

  // setIntegralCommodityForm() {
  //   if (this.data) {
  //     this.modalTitle = '编辑商品信息';
  //     // console.log(this.data);
  //     this.formDatas = this._IntegralCommodityFormService.setForm(this.data);
  //   } else {
  //     this.modalTitle = '新增商品信息';
  //     this.formDatas = this._IntegralCommodityFormService.setForm();
  //   }
  // }
  //
  // getValue(data) {
  //   if (this.data) {
  //     //  console.log(this.data);
  //     this._IntegralCommodityService.integralCommodityUpdate(data)
  //       .subscribe(
  //         data => {
  //           // console.log(data);
  //           if (data.code === 0) {
  //             this.close();
  //             this.handleEmit.emit('修改成功！');
  //           } else {
  //             this.errorMessage = '修改失败～请重新操作！';
  //           }
  //           ;
  //         }), err => {
  //       this.errorMessage = '啊哦！接口访问出错啦～';
  //     }
  //   } else {
  //     // console.log(data);
  //     this._IntegralCommodityService.integralCommodityUpdate(data)
  //       .subscribe(
  //         data => {
  //           // console.log(data);
  //           if (data.code === 0) {
  //             this.close();
  //             this.handleEmit.emit('添加成功！');
  //           } else {
  //             this.errorMessage = '添加失败～请重新操作！';
  //           }
  //         }), err => {
  //       this.errorMessage = '啊哦！接口访问出错啦～';
  //     }
  //   }
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
