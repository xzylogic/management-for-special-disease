import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import { PushTimeService} from '../_service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'push-time-edit',
  templateUrl: './push-time-edit.component.html',
  styleUrls: ['./push-time-edit.component.css']
})
export class PushTimeEditComponent implements OnInit {

	@Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter < any > = new EventEmitter();
  @Output() handleEmit: EventEmitter < any > = new EventEmitter();

  errorMessage: string;
  userPushTime:any;
  project:any;

  constructor(
  	private _pushtimeservice: PushTimeService
  	) { }

  ngOnInit() {
  	this.pushtimeedit();
  	this.date();
  }

  pushtimeedit(){
  	this.project = this.data.value.desc;
  	this.userPushTime = this.data.value.value;
  }


  getValue(){
    this._pushtimeservice.PushTimeEdit(this.userPushTime)
    .subscribe(
        data => {
          if (data.code === 0) {
            this.handleEmit.emit("推送时间修改成功！");
            this.close();
          } else {
            if (data.msg) {
              this.errorMessage = data.msg;
            } else {
              this.errorMessage = "操作失败！";
            }
          }
        }, err => {
          this.errorMessage = "啊哦！访问出错啦～";
    })
  }

  //时间选择
  date(){
    $("#patient").flatpickr({
      "locale": "zh",
      "enableTime":true,
      "noCalendar":true
    });
  }

  //关闭模态框
 close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  } 

}
