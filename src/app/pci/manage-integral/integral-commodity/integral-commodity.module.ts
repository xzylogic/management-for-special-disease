import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IntegralCommodityComponent } from './integral-commodity.component';
import { IntegralCommodityEditComponent } from './integral-commodity-edit';

import { IntegralCommodityService, IntegralCommodityFormService, IntegralCommodityTableService } from './_service';

import { DynamicTableModule, TabModule, ModalModule, EditModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: IntegralCommodityComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    ModalModule,
    EditModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralCommodityComponent,
    IntegralCommodityEditComponent
  ],
  providers: [
    IntegralCommodityService,
    IntegralCommodityFormService,
    IntegralCommodityTableService
  ]
})
export class IntegralCommodityModule {}
