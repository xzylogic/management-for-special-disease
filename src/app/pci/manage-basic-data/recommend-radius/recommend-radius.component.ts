/**
 * Created by zhanglin on 2017/8/1.
 */
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ContainerConfig } from '../../../libs';
import { ERRMSG } from '../../_store/static';
import { RecommendRadiusService } from './_service/recommend-radius.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-recommend-radius',
  templateUrl: './recommend-radius.component.html'
})
export class RecommendRadiusComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: FormGroup;
  config: any;
  errMsg = '';
  recommendRadiusId: number;

  constructor(
    @Inject('action') private action,
    private recommendRadiusService: RecommendRadiusService,
    private dialog: MdDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.recommendRadiusService.RecommendRadiusConfig();
    this.recommendRadiusService.getRecommendRadius().subscribe(
      res => {
        if (res.data.radii !== '') {
          this.createForm(res.data);
        } else {
          this.createForm();
        }
        this.recommendRadiusId = res.data.id;
      }, err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  createForm(data?) {
    this.form = this.fb.group({
      radii: new FormControl({value: ''})
    });
    this.config = {
      radii: new FormText({
        label: '推荐半径（推荐时患者与医生定位最远距离(km)）：',
        key: 'radii',
        value: data && data.radii || ''
      })
    }
  }

  getValues(value) {
    value.id = this.recommendRadiusId;
    this.recommendRadiusService.recommendRadiusEdit(value.id, value.radii)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            // HintDialog(ERRMSG.saveSuccess, this.dialog);
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

