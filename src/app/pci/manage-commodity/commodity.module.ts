import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommodityComponent } from './commodity.component';
import { CommodityEditComponent } from './commodity-edit/commodity-edit.component';

import { AuthGuardService } from '../_service/auth-guard.service';
import { CommodityService } from './_service/commodity.service';
import { CommodityFormService } from './_service/commodity-form.service';
import { CommodityTableService } from './_service/commodity-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: CommodityComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    CommodityComponent,
    CommodityEditComponent
  ],
  providers: [
    CommodityService,
    CommodityFormService,
    CommodityTableService
  ]
})
export class CommodityModule {
}
