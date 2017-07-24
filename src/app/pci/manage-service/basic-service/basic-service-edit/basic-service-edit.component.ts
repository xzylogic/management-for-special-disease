import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { ContainerConfig, FormText } from '../../../../libs';
import { BasicServiceService } from '../_service/basic-service.service';
import { BasicServiceFormService } from '../_service/basic-service-form.service';
import { Doctor } from '../../../manage-doctor/doctor/_entity/doctor.entity';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFile } from '../../../../libs/dform/_entity/form-file';

@Component({
  selector: 'app-basic-service-edit',
  templateUrl: './basic-service-edit.component.html'
})
export class BasicServiceEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['basic-service', 'data']) doctor: Observable<Doctor>;
  form: FormGroup;
  config: any;

  constructor(
    private basicServiceService: BasicServiceService,
    private basicServiceFormService: BasicServiceFormService,
    private dialog: MdDialog,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.basicServiceService.basicServiceEditConfig(true);
  }

  createForm() {
    this.form = this.fb.group({
      iconUrl: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      times: new FormControl({value: ''}, Validators.required),
      enable: new FormControl({value: ''}, Validators.required),
      unitId: new FormControl({value: ''}, Validators.required),
      numbers: new FormControl({value: ''}, Validators.required),
      description: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      iconUrl: new FormFile({
        label: '服务图片',
        key: 'iconUrl',
        url: '',
        value: ''
      }),
      name: new FormText({
        type: 'text',
        label: '服务名称',
        key: 'name',
        value: ''
      }),
    }
    // new FormFile({
    //   label: '服务图片',
    //   key: 'iconUrl',
    //   url: '',
    //   value: ''
    // }),
    // new FormText({
    //   type: 'text',
    //   label: '服务名称',
    //   key: 'name',
    //   value: ''
    // }),
    // new FormText({
    //   type: 'text',
    //   label: '咨询次数',
    //   key: 'times',
    //   value: ''
    // }),
    // new FormText({
    //   type: 'text',
    //   label: '状态',
    //   key: 'enable',
    //   value: ''
    // }),
    // new FormText({
    //   type: 'text',
    //   label: '单位',
    //   key: 'name',
    //   value: ''
    // }),
    // new FormText({
    //   type: 'text',
    //   label: '服务时长',
    //   key: 'name',
    //   value: ''
    // }),
    // new FormText({
    //   type: 'text',
    //   label: '服务说明',
    //   key: 'name',
    //   value: ''
    // })];
  }

  getValues(value) {
    console.log(value);
    // data.numbers = data.numbers.join(',');
    // if (this.data) {
    //   this._basicServiceService.basicServiceUpdate(data)
    //     .subscribe(
    //       data => {
    //         if (data.code === 0) {
    //           this.handleEmit.emit("基础服务修改成功！");
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
  }
}
