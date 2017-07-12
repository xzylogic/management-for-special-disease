import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit, Inject} from '@angular/core';

import {OperationPushService} from '../_service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'operation-push-edit',
  templateUrl: './operation-push-edit.component.html',
  styleUrls: ['./operation-push-edit.component.css']
})
export class OperationPushEditComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter<any> = new EventEmitter();
  @Output() handleEmit: EventEmitter<any> = new EventEmitter();

  modalTitle: string;
  time: any;
  push: any = {
    typeIdx: 0,
    send: false,
  };

  errorMessage;
  skip: boolean = true;
  type: number;
  pushUrl: any;
  number: any;

  clients = [
    {id: 0, name: "患者端"},
    {id: 1, name: "医生端"}
  ];

  sends = [
    {id: true, name: "保存即发送"},
    {id: false, name: "设定发送时间"}
  ];

  skips = [
    {id: true, name: "跳转到网址"},
    {id: false, name: "跳转到APP页面"}
  ];

  types = [
    {id: 1, name: "医生详情页"},
    {id: 2, name: "第三方服务页"}
  ];

  constructor(private _operationpushservice: OperationPushService,
              @Inject('admin') private admin) {
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.pushDate();
  }

  getData() {
    if (this.data) {
      this.push.content = this.data.content;
      this.push.pushId = this.data.id;
      this.time = this.data.pushTime;
      this.pushUrl = this.data.pushUrl;
      this.getpushUrl(this.data.pushUrl);
      this.push.typeIdx = this.data.type;
      this.push.send = false;
    } else {
      this.getRadio(true);
      this.getSkipRadio(true);
      this.push.send = true;
    }
  }

  getSave() {
    this.getStatus();
    this._operationpushservice.OperationPushAdd(this.push)
      .subscribe(
        data => {
          if (data.code === 0) {
            this.handleEmit.emit("操作成功！");
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

  //状态信息转换
  getStatus() {
    this.push.operator = this.admin.getName();
    if (this.time) {
      this.push.pushTime = this.getpushTime(this.time);
    }
    if (this.skip == true) {
      this.push.pushUrl = this.pushUrl;
    } else {
      if (this.type == 1) {
        this.push.pushUrl = "PCIPatient://doctor/" + this.number;
      } else if (this.type == 2) {
        this.push.pushUrl = "PCIPatient://thirdService/" + this.number;
      }
    }
  }

  //编辑信息显示
  getpushUrl(data) {
    let string = data.substring(13, 19);
    if (string === "doctor") {
      this.skip = false;
      this.type = 1;
      this.getSkipRadio(false);
      let number = data.match(/\d/g).join("");
      this.number = number;
    } else if (string === "thirdS") {
      this.skip = false;
      this.type = 2;
      this.getSkipRadio(false);
      let number = data.match(/\d/g).join("");
      this.number = number;
    } else {
      this.getSkipRadio(true);
    }
  }

  getRadio(data) {
    if (data == true) {
      delete this.push.time;
      $("#pushtime").css({
        display: "none"
      });
    } else if (data == false) {
      $("#pushtime").css({
        display: "block"
      })
    }
  }

  getSkipRadio(data) {
    if (data == true) {
      $(".skip-url").css({
        visibility: "visible"
      });
      $(".skip-app").css({
        display: "none"
      });
      $("#1").css({
        display: "inline-block"
      });
    } else {
      $(".skip-url").css({
        visibility: "hidden"
      });
      $(".skip-app").css({
        display: "block"
      });
      $("#1").css({
        display: "none"
      });
    }
  }

  getclientRadio(data) {
    if (data == 1) {
      $("#false").css({
        display: "none"
      });
      $(".skip-app").css({
        display: "none"
      });
    } else {
      $("#false").css({
        display: "block"
      });
      $(".skip-app").css({
        display: "block"
      });
    }
  }

  //提交时间转换
  getpushTime(date) {
    var time = new Date(date.replace(/-/g, '/'));
    return time.getTime();
  }

  pushDate() {
    $("#pushtime").flatpickr({
      "locale": "zh",
      "enableTime": true
    });
  }

  //关闭模态框
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
