import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { ContainerConfig, FormText } from '../../../../libs';
import { BasicServiceService } from '../_service/basic-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { BasicService } from '../_entity/basic-service.entity';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-basic-service-edit',
  templateUrl: './basic-service-edit.component.html'
})
export class BasicServiceEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['basicService', 'data']) basicService: Observable<BasicService>;
  form: FormGroup;
  config: any;
  numbers: Array<any> = [];
  id: number;

  constructor(
    @Inject('app') private app,
    private basicServiceService: BasicServiceService,
    private dialog: MdDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.basicServiceService.basicServiceEditConfig(true);
    this.basicService.subscribe(data => {
      if (data && data.id > 0) {
        this.id = data.id;
        this.numbers = data.serviceNumbers;
        this.createForm(data);
      }
    });
    this.cdr.detectChanges();
  }

  createForm(data) {
    this.form = this.fb.group({
      iconUrl: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      times: new FormControl({value: ''}, Validators.required),
      enable: new FormControl({value: ''}, Validators.required),
      unitId: new FormControl({value: ''}, Validators.required),
      numbers: new FormControl({value: ''}, Validators.required),
      description: new FormControl({value: ''}),
    });
    this.config = {
      iconUrl: new FormFile({
        label: '服务图片',
        key: 'iconUrl',
        url: this.app.pci.UPLOAD_URL,
        value: data.iconUrl || ''
      }),
      name: new FormText({
        type: 'text',
        label: '服务名称',
        key: 'name',
        value: data.name || ''
      }),
      times: new FormText({
        type: 'number',
        label: '咨询次数',
        key: 'times',
        value: data.times || ''
      }),
      enable: new FormRadio({
        label: '状态',
        key: 'enable',
        options: [{
          id: true,
          name: '启用'
        }, {
          id: false,
          name: '禁用'
        }],
        value: data.enable
      }),
      unitId: new FormRadio({
        label: '单位',
        key: 'unitId',
        options: [{
          id: 1,
          name: '鲜花／月'
        }, {
          id: 2,
          name: '天'
        }, {
          id: 3,
          name: '朵花／次'
        }, {
          id: 4,
          name: '年'
        }],
        value: data.unitId || 1
      }),
      numbers: new FormText({
        type: 'text',
        label: '服务时长',
        key: 'numbers',
        value: data.numbers || ''
      }),
      description: new FormTextarea({
        label: '服务说明',
        key: 'description',
        value: data.description || ''
      }),
    }
  }

  addNumber(number) {
    if (this.numbers.indexOf(number) < 0) {
      this.numbers.push(number);
      this.numbers.sort((a, b) => a - b);
    }
  }

  delNumber(number) {
    const i = this.numbers.indexOf(number);
    this.numbers.splice(i, 1);
  }

  getValues(value) {
    value.id = this.id;
    if (typeof value.numbers === 'object') {
      value.numbers = value.numbers.join(',');
    }
    console.log(value);
    this.basicServiceService.basicServiceUpdate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/basic-service']);
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}
