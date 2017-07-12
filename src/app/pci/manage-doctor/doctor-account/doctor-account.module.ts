import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DoctorAccountComponent } from './doctor-account.component';
import { ExchangeCommoditiesComponent } from './exchange-commodities';
import { ReceiveFlowersComponent } from './receive-flowers';

import { DoctorAccountService, DoctorAccountTableService } from './_service';

import {
  DynamicTableModule,
  DynamicFormModule,
  TabModule,
  ModalModule
} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DoctorAccountComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableModule,
    DynamicFormModule,
    TabModule,
    ModalModule,
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
export class DoctorAccountModule {}
