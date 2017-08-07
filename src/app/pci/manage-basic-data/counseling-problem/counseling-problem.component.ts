/**
 * Created by zhanglin on 2017/8/1.
 */
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';

import {
  TableOption, ContainerConfig, DialogOptions,
  ActionDialog, HintDialog,
} from '../../../libs';
import { ERRMSG } from '../../_store/static';
import { CounselingProblemService } from './_service/counseling-problem.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormHidden } from '../../../libs/dform/_entity/form-hidden';
import { FormTextarea } from '../../../libs/dform/_entity/form-textarea';

@Component({
  selector: 'app-counseling-problem',
  templateUrl: './counseling-problem.component.html'
})
export class CounselingProblemComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: FormGroup;
  config: any;
  errMsg = '';
  counselingProblemId: number;

  constructor(
    @Inject('action') private action,
    private counselingProblemService: CounselingProblemService,
    private dialog: MdDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.counselingProblemService.counselingProblemConfig();
    this.counselingProblemService.getCounselingProblem().subscribe(
      res => {
        if ( res.data.question !== '' ) {
          this.createForm(res.data);
        }else {
          this.createForm();
        }
        this.counselingProblemId = res.data.id;
      }, err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    this.form = this.fb.group({
      question: new FormControl({value: ''})
    });
    this.config = {
      question: new FormTextarea({
        label: '咨询内容',
        key: 'question',
        size: '800',
        value: data && data.question || ''
      })
    }
  }

  getValues(value) {
    value.id = this.counselingProblemId;
    this.counselingProblemService.counselingProblemEdit(value.id, value.question)
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
