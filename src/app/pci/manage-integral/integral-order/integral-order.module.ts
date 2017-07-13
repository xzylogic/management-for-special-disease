import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegralOrderComponent } from './integral-order.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralOrderService } from './_service/integral-order.service';
import { IntegralOrderTableService } from './_service/integral-order-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralOrderComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralOrderComponent
  ],
  providers: [
    IntegralOrderService,
    IntegralOrderTableService
  ]
})
export class IntegralOrderModule {
}
