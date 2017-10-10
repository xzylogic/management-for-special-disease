import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdChipsModule, MdTabsModule, MdDialogModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DoctorAccountComponent } from './doctor-account.component';
import { ExchangeCommoditiesComponent } from './exchange-commodities/exchange-commodities.component';
import { SendFlowersComponent } from './send-flowers/send-flowers.component';
import { ReceiveFlowersComponent } from './receive-flowers/receive-flowers.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorAccountService } from './_service/doctor-account.service';
import { DoctorAccountTableService } from './_service/doctor-account-table.service';

const routes: Routes = [{
  path: '',
  component: DoctorAccountComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'receive-flowers',
  component: ReceiveFlowersComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'exchange-commodities',
  component: ExchangeCommoditiesComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdDialogModule,
    MdChipsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorAccountComponent,
    ExchangeCommoditiesComponent,
    ReceiveFlowersComponent,
    SendFlowersComponent
  ],
  providers: [
    DoctorAccountService,
    DoctorAccountTableService
  ],
  entryComponents: [SendFlowersComponent]
})
export class DoctorAccountModule {
}
