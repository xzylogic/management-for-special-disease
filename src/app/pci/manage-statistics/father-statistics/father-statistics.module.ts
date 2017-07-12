import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FatherStatisticsComponent } from './father-statistics.component';

import {
  fatherStatisticsService,
  fatherStatisticsTableService
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
  component: FatherStatisticsComponent
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
    FatherStatisticsComponent
  ],
  providers: [
    fatherStatisticsService,
    fatherStatisticsTableService
  ]
})
export class FatherStatisticsModule {}
