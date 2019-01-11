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
    // private smsModelService: SmsModelService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    // console.log(this.smsModelService.smsData)
    console.log(this.form);
    this.subscribeRoute = Observable.zip(
      this.route.params, this.route.queryParams,
      this.SmsModelService.getSMS(),
      (route, query, menu): any => ({route, query, menu})
    ).subscribe(res => {
      console.log('-------',res)
      // if (res.route.menu) {
      //   this.paramsMenu = res.route.menu;
      // }
      if (res.menu && res.query && res.query.id) {
        this.id = res.query.id;
        this.containerConfig = this.SmsModelService.setSmsModelConfig(true);
        this.getInit(res.query.id, res);
      } else if (res.menu) {
        this.containerConfig = this.SmsModelService.setSmsModelConfig(false);
        this.form = this.SmsModelService.setSmsModelForm(res.menu.data);
      }
    });
    this.adminName.subscribe(name => {
      this.username = name;
    })
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

  getInit(id, res) {
    this.form = this.SmsModelService.setSmsModelForm(res.menu.data, id);
  }

  getValue(data) {
    console.log(data)
    const formData: any = {};
    if (this.id) {
      formData.templateId = this.id;
    }
    formData.description = data.description;
    formData.content = data.content;
    console.log(formData)
    this.subscribeSave = this.SmsModelService.addTemplate(formData, this.id)
      .subscribe(res => {
        console.log(res)
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
  }
}
