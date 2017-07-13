import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FollowUpPlanService } from '../_service/follow-up-plan.service';

// declare var $: any;

@Component({
  selector: 'app-follow-p-edit',
  templateUrl: 'follow-up-plan-edit.component.html'
})
export class FollowUpPlanEditComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter<any> = new EventEmitter();
  @Output() handleEmit: EventEmitter<any> = new EventEmitter();

  modalTitle: string;
  errorMessage: string;

  myForm: FormGroup;
  type: number;
  name: string;
  custom: boolean;
  customName: string;

  followTypeList: Array<any> = [{
    id: 1,
    name: '一个月'
  }, {
    id: 3,
    name: '三个月'
  }, {
    id: 6,
    name: '六个月'
  }, {
    id: 9,
    name: '九个月'
  }, {
    id: 12,
    name: '十二个月'
  }];

  customList: Array<any> = [{
    id: 1,
    name: '复查血一套'
  }, {
    id: 2,
    name: '心电图'
  }, {
    id: 3,
    name: '心超和彩超'
  }, {
    id: 4,
    name: '24小时心电图'
  }, {
    id: 5,
    name: '颈动脉多普勒超声'
  }, {
    id: 6,
    name: '复查冠脉造影'
  }, {
    id: 7,
    name: '自定义'
  }];

  constructor(private _followUpPlanService: FollowUpPlanService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.type = this.data && this.data.value && this.data.value.type || null;
    if (this.data && this.data.value && this.data.value.custom) {
      this.name = '自定义';
      this.customName = this.data && this.data.value && this.data.value.customName || '';
    } else {
      this.name = this.data && this.data.value && this.data.value.name || '';
    }

    this.myForm = new FormGroup({
      type: new FormControl(this.type,
        Validators.compose([
          Validators.required
        ])),
      name: new FormControl(this.name,
        Validators.compose([
          Validators.required
        ])),
      customName: new FormControl(this.customName)
    })

  }

  ngAfterViewInit() {
    // $('#followTypeList').dropdown();
    // $('#customList').dropdown();
  }

  get isTypeValid() {
    return this.myForm.controls['type'].valid;
  }

  get isNameValid() {
    return this.myForm.controls['name'].valid;
  }

  // 提交保存信息
  onSubmit(data) {
    if (data.name === '自定义') {
      data.name = data.customName;
      data.custom = true;
    } else {
      data.custom = false;
    }
    delete data.customName;
    if (this.data) {
      data.id = this.data.value.id;
      this._followUpPlanService.followUpPlanEdit(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit('修改随访项成功！');
              this.close();
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
      this._followUpPlanService.followUpPlanCreate(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              this.handleEmit.emit('新增随访项成功！');
              this.close();
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

  // 关闭模态框
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }
}
