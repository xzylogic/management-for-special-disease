import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterStatisticsComponent } from './register-statistics.component';

import {
  RegisterStatisticsService,
  RegisterStatisticsTableService
} from './_service';

import {
  DynamicTableModule,
  ModalModule,
  TabModule
} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: RegisterStatisticsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    DynamicTableModule,
    ModalModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterStatisticsComponent
  ],
  providers: [
    RegisterStatisticsService,
    RegisterStatisticsTableService
  ]
})
export class RegisterStatisticsModule {}
