import { Component, OnInit } from '@angular/core';
import { AutoReplyService } from './_service/auto-reply.service';

@Component({
  selector: 'app-auto-reply',
  templateUrl: 'auto-reply.component.html'
})
export class AutoReplyComponent implements OnInit {
  // title = '自动回复维护';
  // subTitle = '自动回复信息';
  //
  // autoReply: string;
  //
  // ifEdit: boolean = false;
  //
  // errorMessage: string = '';

  constructor(private _autoReplyService: AutoReplyService) {
  }

  ngOnInit() {
    // this.getAutoReply();
  }

  // getAutoReply() {
  //   this._autoReplyService.getAutoReply()
  //     .subscribe(data => {
  //       if (data.code === 0 && data.data) {
  //         this.autoReply = data.data;
  //       }
  //     }, error => {
  //
  //     })
  // }
  //
  // updateReply(value) {
  //   this._autoReplyService.autoReplyUpdate(value.name)
  //     .subscribe(data => {
  //       if (data.code === 0) {
  //         this.errorMessage = '';
  //         this.getAutoReply();
  //         this.ifEdit = false;
  //       } else {
  //         if (data.msg) {
  //           this.errorMessage = data.msg;
  //         } else {
  //           this.errorMessage = '保存失败！';
  //         }
  //       }
  //     }, err => {
  //       this.errorMessage = '连接服务器出错！';
  //     })
  // }
  //
  // toUpdate() {
  //   this.ifEdit = true;
  // }
  //
  // toCancel() {
  //   this.ifEdit = false;
  // }
}
