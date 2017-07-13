import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegralCommodityComponent } from './integral-commodity.component';
import { IntegralCommodityEditComponent } from './integral-commodity-edit/integral-commodity-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralCommodityService } from './_service/integral-commodity.service';
import { IntegralCommodityFormService } from './_service/integral-commodity-form.service';
import { IntegralCommodityTableService } from './_service/integral-commodity-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralCommodityComponent
}];

@NgModule({
  imports: [
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
export class IntegralCommodityModule {
}
