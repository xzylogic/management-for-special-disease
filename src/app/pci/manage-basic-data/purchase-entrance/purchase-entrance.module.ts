/**
 * Created by zhanglin on 2017/8/1.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { PurchaseEntranceComponent } from './purchase-entrance.component';
import { PurchaseEntranceService } from './_service/purchase-entrance.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: PurchaseEntranceComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PurchaseEntranceComponent
  ],
  providers: [
    PurchaseEntranceService
  ]
})
export class PurchaseEntranceModule {
}
