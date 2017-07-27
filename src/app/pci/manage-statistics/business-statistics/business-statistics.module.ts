import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdTabsModule } from '@angular/material';

import { DTableModule, LibModule } from '../../../libs';

import { BusinessStatisticsComponent } from './business-statistics.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { BusinessStatisticsService } from './_service/business-statistics.service';
import { BusinessStatisticsTableService } from './_service/business-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: BusinessStatisticsComponent
}];

@NgModule({
  imports: [
    MdTabsModule,
    DTableModule,
    LibModule,
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
