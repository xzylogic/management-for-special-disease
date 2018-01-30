import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { CouponIssueComponent } from './coupon-issue.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { CouponIssueService } from './_service/coupon-issue.service';
import { CouponIssueTableService } from './_service/coupon-issue-table.service';

const routes: Routes = [{
  path: '',
  component: CouponIssueComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    MatTabsModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CouponIssueComponent
  ],
  providers: [
    CouponIssueService,
    CouponIssueTableService,
  ]
})
export class CouponIssueModule {
}
