import { Component, OnInit } from '@angular/core';

import { HealthNewsService } from '../_service/health-news.service';
import { HealthNewsFormService } from '../_service/health-news-form.service';

@Component({
  selector: 'app-health-news-edit',
  template: `
    <h1>health-news-edit</h1>
  `
})
export class HealthNewsEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() typeList: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();
  // @Output() handleEmit: EventEmitter < any > = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private _healthNewsService: HealthNewsService,
    private _healthNewsFormService: HealthNewsFormService
  ) {
  }

  ngOnInit() {
    // if (this.typeList) {
    //   this.setHealthNewsForm();
    // } else {
    //   this.errorMessage = '数据错误～';
    // }
  }

  // setHealthNewsForm() {
  //   if (this.data) {
  //     this.modalTitle = "编辑健康资讯信息";
  //     this.formDatas = this._healthNewsFormService.setForm(this.typeList, this.data);
  //   } else {
  //     this.modalTitle = "新增健康资讯信息";
  //     this.formDatas = this._healthNewsFormService.setForm(this.typeList);
  //   }
  // }
  //
  // getValue(value) {
  //   if (this.data) {
  //     this._healthNewsService.healthNewsUpdate(value)
  //       .catch(
  //         err => {
  //           this.errorMessage = "啊哦！接口访问出错啦～";
  //           return Observable.throw(err);
  //         })
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit("健康资讯分类修改成功！");
  //             this.close();
  //           } else {
  //             this.errorMessage = "保存失败～请重新操作！";
  //           }
  //         })
  //
  //   } else {
  //     this._healthNewsService.healthNewsCreate(value)
  //       .catch(
  //         err => {
  //           this.errorMessage = "啊哦！接口访问出错啦～";
  //           return Observable.throw(err);
  //         })
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit("健康资讯分类保存成功！");
  //             this.close();
  //           } else {
  //             this.errorMessage = "保存失败～请重新操作！";
  //           }
  //         })
  //   }
  //
  // }
  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
