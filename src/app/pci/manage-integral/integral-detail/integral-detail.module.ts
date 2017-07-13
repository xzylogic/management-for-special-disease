import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegralDetailComponent } from './integral-detail.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralDetailComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralDetailComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ]
})
export class IntegralDetailModule {
}
