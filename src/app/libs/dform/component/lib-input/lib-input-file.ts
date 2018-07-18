import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { HttpService } from '../../../_service/http.service';
import { HintDialog } from '../../../dmodal/dialog.component';
import { FormFile } from '../../_entity/form-file';

@Component({
  selector: 'app-input-file',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content" #file type="file" multiple="multiple" (change)="uploadChange($event)">
        <span class="input_span">{{data.label}}</span>
        <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
        <div class="upload_container">
          <div class="upload_content" *ngIf="!data.multiple&&value">
            <img class="image" [src]="value">
            <mat-icon (click)="fileDel()">close</mat-icon>
          </div>
          <div *ngIf="data.multiple">
            <div class="upload_content" *ngFor="let item of value">
              <img class="image" [src]="item">
              <mat-icon (click)="fileDel(item)">close</mat-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputFileComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormFile;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('file') file: any;

  constructor(
    private uploadService: HttpService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (this.data.multiple === true && this.value) {
      this.value = typeof this.value === 'object' ? this.value : [this.value];
    }
  }

  // 上传图片操作
  uploadChange(files) {
    const myForm = new FormData();
    const fileList = files.target.files;
    for (let i = 0; i < fileList.length; i++) {
      // console.log(fileList[i]);
      if (fileList[i].size > 5 * 1024 * 1024) {
        this.photoCompress(fileList[i], 1536, (value) => {
          // console.log(value);
          myForm.append('file', value);
          this.fileUpload(myForm)
        })
      } else {
        myForm.append('file', fileList[i]);
        this.fileUpload(myForm)
      }
    }
  }

  fileUpload(form) {
    this.uploadService.upload(this.data.url, form)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('上传图片成功！', this.dialog);
          if (this.data.multiple === false) {
            this.value = res.data;
          } else {
            if (!this.value) {
              this.value = [];
            }
            for (let i = 0; i < res.data.length; i++) {
              this.value.push(res.data[i]);
            }
          }
          this.cdr.detectChanges();
        } else {
          HintDialog(res.msg || '上传图片失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('上传图片失败！', this.dialog);
      });
  }

  fileDel(file ?: any) {
    if (!file) {
      this.value = '';
      this.file.nativeElement.value = '';
      this.cdr.detectChanges();
      HintDialog('删除照片成功！', this.dialog);
    } else {
      const i = this.value.indexOf(file);
      if (i !== -1) {
        this.value.splice(i, 1);
        this.cdr.detectChanges();
      }
      if (this.value.length === 0) {
        this.value = null;
        this.file.nativeElement.value = '';
        this.cdr.detectChanges();
      }
      HintDialog('删除照片成功！', this.dialog);
    }
  }

  change() {
    this.valueChange.emit(this.value);
  }

  /**
   * 图片压缩
   * @param file 文件
   * @param width 压缩宽度
   * @param callback
   */
  photoCompress(file, width, callback) {
    let ready = new FileReader();
    ready.readAsDataURL(file);
    ready.onload = (e) => {
      let re = e.target['result'];
      this.canvasDataURL(re, width, callback);
    }
  }

  canvasDataURL(imagePath, width, callback) {
    let img = new Image();
    img.src = imagePath;
    img.onload = (e) => {
      // 图片原始尺寸
      let originWidth = e.target['width'], originHeight = e.target['height'];
      // 最大尺寸限制
      let maxWidth = width || 800, maxHeight = width || 800;
      // 目标尺寸
      let targetWidth = originWidth, targetHeight = originHeight;
      // 图片尺寸超过 [width] x [width] 的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }

      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        callback(blob);
      })
    }
  }

  /**
   * 将以base64的图片url数据转换为Blob
   * @param urlData 用url方式表示的base64图片数据
   */
  convertBase64UrlToBlob(urlData) {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  }

}
