import { Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ContainerConfig, HintDialog } from '../../../libs';
import { OperationPushService } from '../_service/operation-push-service.service';
import { Operation } from '../_entity/operationPush.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-operation-push-edit',
  templateUrl: './operation-push-edit.component.html',
  styleUrls: ['./operation-push-edit.component.css']
})
export class OperationPushEditComponent implements OnInit, AfterViewInit {
  containerConfig: ContainerConfig;
  @select(['operation', 'data']) operation: Observable<Operation>;
  form: any;
  errMsg = '';
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter<any> = new EventEmitter();
  // @Output() handleEmit: EventEmitter<any> = new EventEmitter();
  //
  // modalTitle: string;
  time: any;
  push: any = {
    typeIdx: 0,
    send: false,
  };
  //
  // errorMessage;
  skip: boolean = true;
  type: number ;
  pushUrl: any;
  number: any;

  clients = [
    {id: 0, name: '患者端'},
    {id: 1, name: '医生端'}
  ];

  sends = [
    {id: true, name: '保存即发送'},
    {id: false, name: '设定发送时间'}
  ];

  skips = [
    {id: true, name: '跳转到网址'},
    {id: false, name: '跳转到APP页面'}
  ];

  types = [
    {id: 1, name: '医生详情页'},
    {id: 2, name: '第三方服务页'}
  ];

  constructor(
    @Inject('auth') private authService,
    private dialog: MdDialog,
    private operationpushservice: OperationPushService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.pushDate();
  }

  getData() {
    this.containerConfig = this.operationpushservice.operationPushEditConfig(true);
    this.operation.subscribe(data => {
      console.log(data);
      // if (data.id) {
      //   this.push.content = data.content;
      //   this.push.pushId = data.id;
      //   this.time = data.pushTime;
      //   this.pushUrl = data.pushUrl;
      //   this.getpushUrl(data.pushUrl);
      //   this.push.typeIdx = data.type;
      //   this.push.send = false;
      // } else {
      //   this.getRadio(true);
      //   this.getSkipRadio(true);
      //   this.push.send = true;
      // }
    });
  }

  getSave() {
    this.getStatus();
    this.operationpushservice.OperationPushAdd(this.push)
      .subscribe(
        res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/lecture']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
  }

  // 状态信息转换
  getStatus() {
    this.push.operator = this.authService.getAdminName();
    if (this.time) {
      this.push.pushTime = this.getpushTime(this.time);
    }
    if (this.skip === true) {
      this.push.pushUrl = this.pushUrl;
    } else {
      if (this.type === 1) {
        this.push.pushUrl = 'PCIPatient://doctor/' + this.number;
      } else if (this.type === 2) {
        this.push.pushUrl = 'PCIPatient://thirdService/' + this.number;
      }
    }
  }

  // 编辑信息显示
  getpushUrl(data) {
    const string = data.substring(13, 19);
    if (string === 'doctor') {
      this.skip = false;
      this.type = 1;
      this.getSkipRadio(false);
      let number = data.match(/\d/g).join("");
      this.number = number;
    } else if (string === 'thirdS') {
      this.skip = false;
      this.type = 2;
      this.getSkipRadio(false);
      let number = data.match(/\d/g).join('');
      this.number = number;
    } else {
      this.getSkipRadio(true);
    }
  }

  getRadio(data) {
    // if (data == true) {
    //   delete this.push.time;
    //   $("#pushtime").css({
    //     display: "none"
    //   });
    // } else if (data == false) {
    //   $("#pushtime").css({
    //     display: "block"
    //   })
    // }
  }

  getSkipRadio(data) {
    // if (data == true) {
    //   $(".skip-url").css({
    //     visibility: "visible"
    //   });
    //   $(".skip-app").css({
    //     display: "none"
    //   });
    //   $("#1").css({
    //     display: "inline-block"
    //   });
    // } else {
    //   $(".skip-url").css({
    //     visibility: "hidden"
    //   });
    //   $(".skip-app").css({
    //     display: "block"
    //   });
    //   $("#1").css({
    //     display: "none"
    //   });
    // }
  }

  getclientRadio(data) {
    // if (data == 1) {
    //   $("#false").css({
    //     display: "none"
    //   });
    //   $(".skip-app").css({
    //     display: "none"
    //   });
    // } else {
    //   $("#false").css({
    //     display: "block"
    //   });
    //   $(".skip-app").css({
    //     display: "block"
    //   });
    // }
  }

  // 提交时间转换
  getpushTime(date) {
    var time = new Date(date.replace(/-/g, '/'));
    return time.getTime();
  }

  pushDate() {
    // $("#pushtime").flatpickr({
    //   "locale": "zh",
    //   "enableTime": true
    // });
  }

}
