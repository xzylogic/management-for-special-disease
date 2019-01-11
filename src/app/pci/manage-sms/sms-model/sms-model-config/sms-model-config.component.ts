import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../_store/static';
import { Observable } from 'rxjs/Observable';
import {select} from "@angular-redux/store";
import {SmsModelService} from "../_service/sms-model.service";

@Component({
  selector: 'app-sms-model-config',
  templateUrl: './sms-model-config.component.html'
})
export class SmsModelConfigComponent implements OnInit, OnDestroy {
  @select(['main', 'adminName']) readonly adminName: Observable<string>;

  username: string;

  paramsMenu: string;
  id: any;

  subscribeRoute: any;
  subscribeDetail: any;
  subscribeDialog: any;
  subscribeSave: any;

  containerConfig: ContainerConfig;
  form: any;
  errMsg = '';

  constructor(
    @Inject('sms-model') private SmsModelService,
    private smsModelService: SmsModelService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    // console.log(this.smsModelService.smsData)
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      (route, query, menu={}): any => ({route, query, menu})
    ).subscribe(res => {
      // console.log('-------',res)
      if (res.query && res.query.id) {
        res.menu = this.smsModelService.smsData;
        this.id = res.query.id;
        this.containerConfig = this.smsModelService.setSmsModelConfig(true);
        this.form = this.smsModelService.setSmsModelForm(res.menu, res.query.id);
      } else {
        this.containerConfig = this.smsModelService.setSmsModelConfig(false);
        this.form = this.smsModelService.setSmsModelForm();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscribeRoute) {
      this.subscribeRoute.unsubscribe();
    }
    if (this.subscribeSave) {
      this.subscribeSave.unsubscribe();
    }
    if (this.subscribeDetail) {
      this.subscribeDetail.unsubscribe();
    }
    if (this.subscribeDialog) {
      this.subscribeDialog.unsubscribe();
    }
  }

  getValue(data) {
    if(this.id){
      data.id = Number(this.id);
      data.templateId = data.templateId.replace('template_', '');
      // console.log(data.templateId)
    }
    // console.log(data)
    if(data.templateId.length === 6){
      this.subscribeSave = this.SmsModelService.addTemplate(data)
        .subscribe(res => {
          if (res.code === 0) {
            this.subscribeDialog = HintDialog(ERRMSG.saveSuccess, this.dialog)
              .afterClosed().subscribe(() => {
                this.router.navigate(['/sms-model']);
              });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    }else{
      HintDialog('模板ID只能输入6位数', this.dialog);
    }

  }
}
