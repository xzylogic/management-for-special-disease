import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-img',
  template: `
    <div style="position: relative">
      <h1 mat-dialog-title>{{option.title}}</h1>
      <div mat-dialog-content>
        <button style="position: absolute;top: 15px;right: 15px" mat-icon-button (click)="rotate()">
          <mat-icon>rotate_right</mat-icon>
        </button>
        <div style="width: 540px;height: 540px;padding: 20px;text-align: center">
          <img [src]="option.image+'?imageView2/2/w/500/h/500/q/75|imageslim'" alt="{{option.title}}"
               [ngStyle]="{'transform': rotateDeg()}">
        </div>
      </div>
    </div>
  `
})
export class DialogImgComponent {
  option: { title: string, image: string } = {title: '', image: ''};
  deg = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogImgComponent>
  ) {
    this.option = this.data;
  }

  rotateDeg() {
    return `rotate(${this.deg}deg)`;
  }

  rotate() {
    this.deg += 90;
  }
}

export function ImageDialog(title, image, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: {title: title, image: image}
  };
  return dialog.open(DialogImgComponent, option);
}
