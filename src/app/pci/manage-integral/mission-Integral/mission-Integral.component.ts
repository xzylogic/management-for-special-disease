import { Component, OnInit, Inject, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';

import { MissionIntegralService } from './_service/mission-Integral.service';
import { MissionIntegralTableService } from './_service/mission-Integral-table.service';

import {
  TableOption, ContainerConfig, ControlType, DialogOptions, FormText,  FormDropdown,
  ActionDialog, HintDialog
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-mission-integral',
  templateUrl: './mission-Integral.component.html',
  styleUrls: ['./mission-Integral.component.scss']
})
export class MissionIntegralComponent implements OnInit {
  containerConfig: ContainerConfig;
  missionIntegralTable: TableOption;
  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    private missionIntegralService: MissionIntegralService,
    private missionIntegralTableService: MissionIntegralTableService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.missionIntegralService.missionIntegralConfig();
    this.missionIntegralTable = new TableOption({
      titles: this.missionIntegralTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getCouponList();
  }

  getCouponList() {
    this.missionIntegralService.getIntegralTask()
      .subscribe(res => {
        this.missionIntegralTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.missionIntegralTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.missionIntegralTable.totalPage = res.data.totalPages;
          this.getStatus(res.data.content);
          this.missionIntegralTable.lists = res.data.content;
        } else {
          this.missionIntegralTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.missionIntegralTable.loading = false;
        console.log(err);
        this.missionIntegralTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  // 状态装换
  getStatus(list) {
    list.forEach(data => {
      if (data.status === 'online') {
        data.statusName = '下架'
      }
      if (data.status === 'offline') {
        data.statusName = '上架';
      }
    })
  }

  gotoHandle(res, value, list) {
    //  上架 下架
    if (value === 'statusName') {
      const config = new DialogOptions({
        title: `您确定要${res}${list.name}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'topass') {
          this.toPassOperation(list.id);
        }
      });
    }

    // 签到编辑
    if (res === 'signin') {
      const config = new MdDialogConfig();
      config.data = list;
      const signin = this.dialog.open(DialogSigninComponent, config);
      signin.afterClosed().subscribe(result => {
        if (result) {
          this.toSignin(result);
        };
      });
    }

    // 记录数据编辑
    if (res === 'record') {
      const config = new MdDialogConfig();
      config.data = list;
      const record = this.dialog.open(DialogRecordComponent, config);
      record.afterClosed().subscribe(result => {
        if (result) {
          this.toRecord(result);
        }
      });
    }

    // 其他任务编辑
    if (value === 'tag' && res !== 'signin' && res !== 'record') {
      const config = new MdDialogConfig();
      config.data = list;
      const other = this.dialog.open(DialogElseComponent, config);
      other.afterClosed().subscribe(result => {
        if (result) {
          this.toOther(result);
        }
      });
    }
  }

// 上架 下架
  toPassOperation(id) {
    this.missionIntegralService.OperationIntegralTask(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  // 签到编辑请求
  toSignin(value) {
    this.missionIntegralService.IntegralTaskEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog('操作成功', this.dialog);
            this.reset();
          } else {
            HintDialog(res.msg || '操作失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog('操作失败', this.dialog);
        });
  }

  // 记录数据编辑请求
  toRecord(value) {
    if (value.doubleUpper === false ) {
      value.toplimit = 0;
      delete value.doubleUpper;
    } else {
      delete value.doubleUpper;
    }
    this.missionIntegralService.IntegralTaskEdit(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  // 其他编辑请求
  toOther(value) {
    console.log(value);
    delete value.name;
    this.missionIntegralService.IntegralTaskEdit(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }
}

@Component({
  selector: 'app-integral-signin',
  templateUrl: './mission-Integral-edit/integral-signin-edit.component.html',
  styleUrls: ['./mission-Integral-edit/integral-edit.component.scss']
})
export class DialogSigninComponent implements OnInit {
  form: FormGroup;
  config: any;
  option: any;
  errMsg = '';
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialogRef: MdDialogRef<DialogSigninComponent>,
  ) {
    this.option = this.data
  }

  ngOnInit() {
    console.log(this.option);
    this.getIntegral(this.option);
    this.createForm(this.option);
    this.cdr.detectChanges();
  }

  // 进入编辑页面状态转换
  getIntegral(data) {
    if (data.status === 'online') {
      data.status = 0;
    }
    if (data.status === 'offline') {
      data.status = 1;
    }
  }

  createForm(data) {
    this.form = this.fb.group({
      other : new FormControl({value: ''}, Validators.required),
      third : new FormControl({value: ''}, Validators.required),
      seventh: new FormControl({value: ''}, Validators.required),
      status: new FormControl({value: ''}, Validators.required),
      tag: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      other : new FormText({
        type: 'number',
        label: '其他每天',
        key: 'other ',
        value: data && data.other || ''
      }),
      third  : new FormText({
        type: 'text',
        label: '第三天',
        key: 'third  ',
        value: data && data.third  || ''
      }),
      seventh  : new FormText({
        type: 'text',
        label: '第七天',
        key: 'seventh  ',
        value: data && data.seventh  || ''
      }),
      status : new FormDropdown({
        label: '状态',
        key: 'status ',
        options:  [{
          id: 0,
          name: '已上架',
        }, {
          id: 1,
          name: '下架',
        }],
        value: data && data.status  || 0
      }),
      tag: new FormText({
        type: 'text',
        label: '#',
        key: 'tag',
        value: data && data.tag  || ''
      }),
    }
  }
}

@Component({
  selector: 'app-integral-record',
  templateUrl: './mission-Integral-edit/integral-record-edit.component.html',
  styleUrls: ['./mission-Integral-edit/integral-edit.component.scss']
})
export class DialogRecordComponent implements OnInit {
  form: FormGroup;
  config: any;
  option: any;
  errMsg = '';
  integral: boolean;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<DialogRecordComponent>,
  ) {
    this.option = this.data
  }

  ngOnInit() {
    this.getIntegral(this.option);
    this.createForm(this.option);
    this.cdr.detectChanges();
  }

  // 进入编辑页面积分上限状态转换
  getIntegral(data) {
    if (data.toplimit === 0) {
      this.integral = false;
      data.doubleUpper = false;
    } else {
      this.integral = true;
      data.doubleUpper = true;
    }
    if (data.status === 'online') {
      data.status = 0;
    }
    if (data.status === 'offline') {
      data.status = 1;
    }
  }

  createForm(data) {
    this.form = this.fb.group({
      doubleUpper : new FormControl({value: ''}, Validators.required),
      toplimit : new FormControl({value: ''}, Validators.required),
      integral : new FormControl({value: ''}, Validators.required),
      status: new FormControl({value: ''}, Validators.required),
      tag: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      doubleUpper : new FormDropdown({
        label: '有无积分上限',
        key: 'doubleUpper ',
        options:  [{
          id: false,
          name: '无',
        }, {
          id: true,
          name: '有',
        }],
        value: data && data.doubleUpper  || false
      }),
      toplimit : new FormText({
        type: 'text',
        label: '积分上限',
        key: 'toplimit ',
        value: data && data.toplimit || ''
      }),
      integral : new FormText({
        type: 'text',
        label: '每次获得积分',
        key: 'integral',
        value: data && data.integral  || ''
      }),
      status : new FormDropdown({
        label: '状态',
        key: 'status ',
        options:  [{
          id: 0,
          name: '已上架',
        }, {
          id: 1,
          name: '下架',
        }],
        value: data && data.status  || 0
      }),
      tag: new FormText({
        type: 'text',
        label: '#',
        key: 'tag',
        value: data && data.tag  || ''
      }),
    }
  }

 // 积分上限显示隐藏
  change(data) {
    if (data.value === true) {
      this.integral = true;
    }
    if (data.value === false) {
      this.integral = false;
    }
  }
}

@Component({
  selector: 'app-integral-else',
  templateUrl: './mission-Integral-edit/integral-else-edit.component.html',
  styleUrls: ['./mission-Integral-edit/integral-edit.component.scss']
})
export class DialogElseComponent implements OnInit {
  form: FormGroup;
  config: any;
  option: any;
  errMsg = '';
  name: any;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<DialogElseComponent>,
  ) {
    this.option = this.data;
  }

  ngOnInit() {
    this.name = this.option.name;
    this.getIntegral(this.option);
    this.createForm(this.option);
    this.cdr.detectChanges();
  }

  // 进入编辑页面状态转换
  getIntegral(data) {
    if (data.status === 'online') {
      data.status = 0;
    }
    if (data.status === 'offline') {
      data.status = 1;
    }
  }

  createForm(data) {
    this.form = this.fb.group({
      integral : new FormControl({value: ''}, Validators.required),
      status: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      tag: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      integral  : new FormText({
        type: 'text',
        label: '获得积分',
        key: 'integral  ',
        value: data && data.integral  || ''
      }),
      status : new FormDropdown({
        label: '状态',
        key: 'status ',
        options:  [{
          id: 0,
          name: '已上架',
        }, {
          id: 1,
          name: '下架',
        }],
        value: data && data.status  || 0
      }),
      tag: new FormText({
        type: 'text',
        label: '#',
        key: 'tag',
        value: data && data.tag  || ''
      }),
    }
  }
}
