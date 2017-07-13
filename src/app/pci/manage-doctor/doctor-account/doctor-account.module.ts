import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorAccountComponent } from './doctor-account.component';
import { ExchangeCommoditiesComponent } from './exchange-commodities/exchange-commodities.component';
import { ReceiveFlowersComponent } from './receive-flowers/receive-flowers.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorAccountService } from './_service/doctor-account.service';
import { DoctorAccountTableService } from './_service/doctor-account-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: DoctorAccountComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorAccountComponent,
    ExchangeCommoditiesComponent,
    ReceiveFlowersComponent
  ],
  providers: [
    DoctorAccountService,
    DoctorAccountTableService
  ]
})
export class DoctorAccountModule {
}
