import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogConfig, MdDialogRef } from '@angular/material';

import { DialogOptions } from './dialog.entity';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {
  option: DialogOptions = new DialogOptions();

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<DialogComponent>
  ) {
    this.option = this.data;
  }
}

export function HintDialog(msg, dialog) {
  const option: MdDialogConfig = <MdDialogConfig>{
    data: new DialogOptions(
      {
        title: '提示信息',
        message: msg,
        buttons: [{
          key: 'comfirm',
          value: '确定',
          color: 'primary'
        }]
      }),
    width: '300px'
  };
  return dialog.open(DialogComponent, option);
}

export function MessageDialog(title, msg, dialog) {
  const option: MdDialogConfig = <MdDialogConfig>{
    data: new DialogOptions(
      {
        title: title,
        message: msg,
        buttons: [{
          key: 'comfirm',
          value: '确定',
          color: ''
        }]
      }),
    width: '300px'
  };
  return dialog.open(DialogComponent, option);
}

export function ActionDialog(config: DialogOptions, dialog) {
  const option: MdDialogConfig = <MdDialogConfig>{
    data: config,
    width: '500px'
  };
  return dialog.open(DialogComponent, option);
}

