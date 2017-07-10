import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFile } from '../../_entity/form-file';
import { UploadService } from '../../_service/upload.service';
import { MdDialog } from '@angular/material';
import { HintDialog } from '../../../dmodal/dialog/dialog.component';

@Component({
  selector: 'app-input-file',
  template: `
    <div [formGroup]="form">
      <input #file type="file" (change)="uploadChange($event)">
      <input type="hidden" [formControlName]="data.key" [(ngModel)]="value">
      <div class="lib-form-set__upload">
        <div *ngIf="!data.multiple&&value">
          <img class="image" [src]="value">
          <md-icon (click)="fileDel()">close</md-icon>
        </div>
        <div *ngIf="data.multiple">
          <div *ngFor="let item of value" class="lib-form-set__upload">
            <img class="image" [src]="item">
            <md-icon (click)="fileDel(item)">close</md-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss'],
  styles: [`
    .lib-form-set__upload {
      width: 100%;
      padding: 15px 0;
      margin-bottom: 30px;
    }

    .lib-form-set__upload img {
      width: 100px;
      height: 100px;
    }

    .lib-form-set__upload img:before,
    .lib-form-set__upload img:after {
      content: "";
      display: table;
      clear: both;
    }
  `]
})
export class LibInputFileComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormFile;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('file') file: any;

  constructor(
    private uploadService: UploadService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    console.log(this.form);
    console.log(this.data);
    console.log(this.value);
  }

  // 上传图片操作
  uploadChange(files) {
    const myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    console.log(myForm);
    // HintDialog('上传图片', this.dialog);
    //
    // console.log(myForm);
    this.uploadService.upload(this.data.url, myForm)
      .subscribe(res => {
        console.log(res);
      });
    // this.uploadService.uploadFile(myForm, this.data.url, this);
  }

  UploadSuccess(data) {
    // if (data.code === 0) {
    //   this.openDialog('上传图片成功！');
    //
    //   if (this.data.multiple === false) {
    //     this.formValue = data.data;
    //     this.cdr.detectChanges();
    //   } else {
    //     if (!this.datadata) {
    //       this.formValue = [];
    //     }
    //     this.data.push(data.data);
    //     this.cdr.detectChanges();
    //   }
    //
    // } else {
    //   this.openDialog('上传图片失败！');
    // }
  }

  UploadFailure(data) {
    // this.openDialog('上传图片失败！');
  }

  fileDel(file ?: any) {
    console.log(file || '');
    // if (!file) {
    //   this.formValue = '';
    //   $('#' + this.formdata.key).val('');
    //   this.cdr.detectChanges();
    //   this.openDialog('删除照片成功！');
    // } else {
    //   let i = this.formValue.indexOf(file);
    //   if (i !== -1) {
    //     this.formValue.splice(i, 1);
    //     this.cdr.detectChanges();
    //   }
    //   if (this.formValue.length === 0) {
    //     this.formValue = null;
    //     $('#' + this.formdata.key).val('');
    //     this.cdr.detectChanges();
    //   }
    //   this.openDialog('删除照片成功！');
    // }
  }

}
