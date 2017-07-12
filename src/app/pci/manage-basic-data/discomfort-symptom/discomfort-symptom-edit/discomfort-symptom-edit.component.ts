import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DiscomfortSymptomService } from '../_service/discomfort-symptom.service';
import { DiscomfortSymptomFormService } from '../_service/discomfort-symptom-form.service';

@Component({
  selector: 'app-discomfort-symptom-edit',
  templateUrl: './discomfort-symptom-edit.html'
})
export class DiscomfortSymptomEditComponent implements OnInit {

  @Input() data: any;
  @Input() list: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter<any> = new EventEmitter();
  @Output() handleEmit: EventEmitter<any> = new EventEmitter();

  modalTitle: string;
  formDatas: any;
  errorMessage: string;

  constructor(
    private discomfortSymptomService: DiscomfortSymptomService,
    private discomfortSymptomFormService: DiscomfortSymptomFormService
  ) {
  }

  ngOnInit() {
    this.setSymptomForm();
  }

  setSymptomForm() {
    if (this.data) {
      this.modalTitle = '编辑不适症状';
      this.formDatas = this.discomfortSymptomFormService.setForm(
        this.list,
        this.data.value.symptomTypeId,
        this.data.value
      );
    } else {
      this.modalTitle = '新增不适症状';
      this.formDatas = this.discomfortSymptomFormService.setForm(this.list);
    }
  }

  // 提交保存信息
  getValue(data) {
    if (this.data) {
      this.discomfortSymptomService.discomfortSymptomEdit(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit('修改不适症状成功！');
              // this.close();
            } else {
              if (res.msg) {
                this.errorMessage = res.msg;
              } else {
                this.errorMessage = '操作失败！';
              }
            }
          }, err => {
            this.errorMessage = '啊哦！访问出错啦～';
          })
    } else {
      this.discomfortSymptomService.discomfortSymptomCreate(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit('新增不适症状成功！');
              // this.close();
            } else {
              if (res.msg) {
                this.errorMessage = res.msg;
              } else {
                this.errorMessage = '操作失败！';
              }
            }
          }, err => {
            this.errorMessage = '啊哦！访问出错啦～';
          })
    }
  }
}
