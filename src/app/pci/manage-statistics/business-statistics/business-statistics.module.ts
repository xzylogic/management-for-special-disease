import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BusinessStatisticsComponent } from './business-statistics.component';

import {
  BusinessStatisticsService,
  BusinessStatisticsTableService
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
  component: BusinessStatisticsComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableModule,
    ModalModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BusinessStatisticsComponent
  ],
  providers: [
    BusinessStatisticsService,
    BusinessStatisticsTableService
  ]
})
export class BusinessStatisticsModule {}
