import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
// import {ActivatedRoute, Router} from '@angular/router';
// import { select } from '@angular-redux/store';
// import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { HttpService } from '../../../libs/_service/http.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
// import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { ControlType, TableOption } from '../../../libs/dtable/dtable.entity';
import { OperationGeneralizeService } from './_service/operation-generalize-service.service';
import { OperationGeneralizeTableService } from './_service/operation-generalize-service-table.service';
// import { OperationGeneralize } from './_entity/operationGeneralize.entity';
// import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-operation-generalize',
  templateUrl: './operation-generalize.component.html',
  styleUrls: ['./operation-generalize.component.scss']
})
export class OperationGeneralizeComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  operationGeneralizeTable: TableOption;
  subscribeRoute: any;
  form: any;
  // operationGeneralizeDoctorTable: TableOption;
  // @select(['operationGeneralize', 'tab']) tab: Observable<number>;
  // @select(['operationGeneralize', 'page']) page: Observable<Array<number>>;

  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    private operationGeneralizeService: OperationGeneralizeService,
    private operationGeneralizeTableService: OperationGeneralizeTableService,
    private uploadService: HttpService,
    private dialog: MatDialog,
    // private route: ActivatedRoute,
    // private router: Router
  ) {
    // action.dataChange('operationGeneralize', new OperationGeneralize());
  }

  ngOnInit() {
    this.containerConfig = this.operationGeneralizeService.operationGeneralizeConfig();
    this.sendSMS();
  }

  sendSMS(){
    this.form = this.operationGeneralizeService.setSMSForm();
  }

  sendMicro(){
    this.form = this.operationGeneralizeService.setMicroForm();
  }

  change(index) {
    index === 0 ? this.sendSMS() : this.sendMicro();
    this.action.tabChange('operationGeneralize', index);
  }

  getValue(data) {
    // console.log(data);
    const formData: any = {};
    const myForm = new FormData();
    // if (this.id) {
    //   formData.adminId = this.id;
    // }
    if(data.templateId.length >= 6){
      myForm.append('file', data.file.target.files[0]);
      formData.templateId = data.templateId && data.templateId.toString();
      data.hasApp === 1 ? formData.hasApp = true : formData.hasApp = false;
      data.hasSms === 1 ? formData.hasSms = true : formData.hasSms = false;
      data.type === 2 ? formData.type = 0 : formData.type = 1;
      formData.args = [];
      Object.keys(data.args && data.args.map(obj => {
        formData.args.push({[obj.modelKey] : obj.modelValue});
      }))
      // formData.file = data.file;
      // console.log(formData);
      const params = `templateId=${formData.templateId}&hasApp=${formData.hasApp}&hasSms=${formData.hasSms}&type=${formData.type}`;
      this.uploadService.upload(`${this.operationGeneralizeService.smsUrl}?${params}`, myForm)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog('发送成功！', this.dialog);
          } else {
            HintDialog(res.msg || '发送失败！', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog('发送失败！', this.dialog);
        });
      // this.operationGeneralizeService.operationSendSMS(params, myForm)
      //   .subscribe(res => {
      //     console.log(res)
      //     if (res.code === 0) {
      //       HintDialog(ERRMSG.saveSuccess, this.dialog)
      //         .afterClosed().subscribe(() => {
      //         console.log('发送短信成功');
      //         // this.router.navigate(['/account']);
      //       });
      //     } else {
      //       HintDialog(res.msg || ERRMSG.saveError, this.dialog);
      //     }
      //   }, err => {
      //     console.log(err);
      //     HintDialog(ERRMSG.saveError, this.dialog);
      //   });
    }else{
      HintDialog('模板ID只能输入6位数！', this.dialog);
    }
  }

  getMicroValue(data) {
    // console.log(data);
    const formData: any = {};
    const myForm = new FormData();
    myForm.append('file', data.file.target.files[0]);
    formData.title = data.title;
    formData.content = data.content;
    formData.date = data.date;
    formData.address = data.address;
    formData.url = data.url;
    console.log(formData);
    const params = `title=${formData.title}&content=${formData.content}&date=${formData.date}&address=${formData.address}&url=${formData.url}`;
    this.uploadService.upload(`${this.operationGeneralizeService.microUrl}?${params}`, myForm)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('发送成功！', this.dialog);
        } else {
          HintDialog(res.msg || '发送失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('发送失败！', this.dialog);
      });
  }

  ngOnDestroy() {
    // if (this.subscribeRoute) {
    //   this.subscribeRoute.unsubscribe();
    // }
    // if (this.subscribeSave) {
    //   this.subscribeSave.unsubscribe();
    // }
    // if (this.subscribeDetail) {
    //   this.subscribeDetail.unsubscribe();
    // }
    // if (this.subscribeDialog) {
    //   this.subscribeDialog.unsubscribe();
    // }
  }
  // //取消发送、删除
  // processCancel() {
  //   this.processData = null;
  //   this.processMessage = '';
  //   this.enableProcess = false;
  // }
  //
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
