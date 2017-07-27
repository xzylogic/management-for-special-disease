import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';

import { PushTimeService } from './_service/push-time-service.service';
import { PushTimeTableService } from './_service/push-time-service-table.service';
import {
  TableOption, ContainerConfig, DialogOptions,
  ActionDialog, HintDialog,
} from '../../../libs';
import { ERRMSG } from '../../_store/static';


@Component({
  selector: 'app-push-time',
  templateUrl: './push-time.component.html'
})
export class PushTimeComponent implements OnInit {
  containerConfig: ContainerConfig;
  pushTimeTable: TableOption;

  constructor(
    @Inject('action') private action,
    private pushtimeservice: PushTimeService,
    private pushtimetableservice: PushTimeTableService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.pushtimeservice.pushTimeConfig();
    this.pushTimeTable = new TableOption({
      titles: this.pushtimetableservice.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getPushTime();
  }
  getPushTime() {
    this.pushtimeservice.getPushTime().subscribe(
      res => {
        this.pushTimeTable.loading = false;
         if (res.data && res.data.length === 0 && res.code === 0) {
            this.pushTimeTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.pushTimeTable.lists = [];
            this.pushTimeTable.lists.push(res.data);
          } else {
            this.pushTimeTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
      }, err => {
        this.pushTimeTable.loading = false;
        this.pushTimeTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  gotoHandle(data) {
    const pushTime = data.value;
    if (data.key === 'edit') {
      this.pushTime(pushTime);
    }
  }

  pushTime(data) {
    const config = new DialogOptions({
      title: `编辑推送时间`,
      message: '',
      buttons: [{
        key: 'confirm',
        value: '确定',
        color: 'primary'
      }, {
        key: 'cancel',
        value: '取消',
        color: ''
      }],
      forms: [{
        key: 'pushTime',
        label: '患者总览数据推送',
        value: data && data.value || ''
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result.key === 'confirm') {
        this.getValue({pushTime: result.value[0].value});
      }
    });
  }

  getValue(data) {
    console.log(data);
    this.pushtimeservice.PushTimeEdit(data.pushTime)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog);
          this.getPushTime();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}
