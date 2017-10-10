import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { FormText, FormFile, HintDialog } from '../../../../libs';

@Component({
  selector: 'app-send-flowers',
  templateUrl: './send-flowers.component.html',
  styleUrls: ['./send-flowers.component.scss']
})
export class SendFlowersComponent implements OnInit {
  form: FormGroup;
  config: any;
  errMsg = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MdDialog,
    private cdr: ChangeDetectorRef,
    @Inject('http') private uploadService,
    @Inject('app') private app,
    public dialogRef: MdDialogRef<SendFlowersComponent>,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.cdr.detectChanges();
  }

  createForm() {
    this.form = this.fb.group({
      flower: new FormControl({value: ''}, Validators.required),
      exEcl: new FormControl({value: ''}, Validators.required),
      description: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      flower: new FormText({
        key: 'flower',
        label: '赠送数量',
        value: '',
        required: true,
      }),
      exEcl: new FormFile({
        key: 'exEcl',
        label: '选择用户',
        value: '',
        required: true,
        url: ''
      }),
      description: new FormText({
        key: 'description',
        label: '明细名称',
        value: '',
        required: true,
      }),
    }
  }

  // 上传表格
  uploadChange(files) {
    const myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    this.uploadService.upload(`${this.app.pci.BASE_URL}api/analyticalXlsxBackIds`, myForm)
      .subscribe(res => {
        if (res.code === 0) {
          this.config.exEcl.value = res.data;
          HintDialog('上传表格成功！', this.dialog);
        } else {
          HintDialog(res.msg || '上传表格失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('上传表格失败！', this.dialog);
      });
  }
}
