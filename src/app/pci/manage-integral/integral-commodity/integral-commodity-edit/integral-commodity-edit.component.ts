import { Component, OnInit } from '@angular/core';

import { IntegralCommodityFormService } from '../_service/integral-commodity-form.service';
import { IntegralCommodityService } from '../_service/integral-commodity.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog/dialog.component';
import { IntegralCommodity } from '../_entity/integralCommodity.entity';

@Component({
  selector: 'app-integral-commodity-edit',
  templateUrl: './integral-commodity-edit.component.html'
})
export class IntegralCommodityEditComponent implements OnInit {

  containerConfig: ContainerConfig;
  @select(['integralCommodity', 'data']) integralCommodity: Observable<IntegralCommodity>;
  errMsg = '';
  form: any;
  integralCommodityId: number;

  constructor(
    private integralCommodityService: IntegralCommodityService,
    private integralCommodityFormService: IntegralCommodityFormService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.integralCommodity.subscribe(data => {
        this.integralCommodityId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.integralCommodityService.integralCommodityEditConfig(true);
          this.form = this.integralCommodityFormService.setForm();
        } else {
          this.containerConfig = this.integralCommodityService.integralCommodityEditConfig(false);
          this.form = this.integralCommodityFormService.setForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    console.log(value);
    this.integralCommodityService.integralCommodityUpdate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/integral-commodity']);
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
