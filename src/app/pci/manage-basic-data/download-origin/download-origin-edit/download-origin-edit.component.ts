import { Component, OnInit } from '@angular/core';

import { DownloadOriginService } from '../_service/download-origin.service';
import { DownloadOriginFormService } from '../_service/download-origin-form.service';

@Component({
  selector: 'app-download-origin-edit',
  templateUrl: './download-origin-edit.component.html'
})
export class DownloadOriginEditComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter <any> = new EventEmitter();
  // @Output() handleEmit: EventEmitter <any> = new EventEmitter();
  //
  // modalTitle: string;
  // formDatas: any;
  // errorMessage: string;

  constructor(
    private _downloadOriginService: DownloadOriginService,
    private _downloadOriginFormService: DownloadOriginFormService
  ) {
  }

  ngOnInit() {
    // this.setDownloadOriginForm();
  }

  // setDownloadOriginForm(){
  //   if(this.data){
  //       this.modalTitle = "编辑渠道来源";
  //       this.formDatas = this._downloadOriginFormService.setForm(this.data);
  //     }else{
  //       this.modalTitle = "新增渠道来源";
  //       this.formDatas = this._downloadOriginFormService.setForm();
  //     }
  // }

  // 提交保存信息
  // getValue(data){
  //   if(this.data){
  //     this._downloadOriginService.downloadOriginUpdate(this.data.id, data)
  //       .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.handleEmit.emit("渠道修改成功！");
  //           this.close();
  //         } else {
  //           this.errorMessage = data.msg || "操作失败！";
  //         }
  //       }, err => {
  //         this.errorMessage = "啊哦！访问出错啦～";
  //       });
  //   }else{
  //     this._downloadOriginService.downloadOriginCreate(data)
  //       .subscribe(
  //       data => {
  //         if (data.code === 0) {
  //           this.handleEmit.emit("新增渠道成功！");
  //           this.close();
  //         } else {
  //           this.errorMessage = data.msg || "操作失败！";
  //         }
  //       }, err => {
  //         this.errorMessage = "啊哦！访问出错啦～";
  //       });
  //   }
  // }
}
