import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { CouponComponent } from './coupon.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { CouponService } from './_service/coupon.service';
import { CouponTableService } from './_service/coupon-table.service';

const routes: Routes = [{
  path: '',
  component: CouponComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: CouponEditComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CouponComponent,
    CouponEditComponent
  ],
  providers: [
    CouponService,
    CouponTableService
  ]
})
export class CouponModule {
}
