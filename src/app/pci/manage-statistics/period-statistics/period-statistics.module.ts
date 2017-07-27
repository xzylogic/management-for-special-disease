import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdTabsModule } from '@angular/material';

import { DTableModule, LibModule } from '../../../libs';

import { PeriodStatisticsComponent } from './period-statistics.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { PeriodStatisticsService } from './_service/period-statistics.service';
import { PeriodStatisticsTableService } from './_service/period-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: PeriodStatisticsComponent
}];

@NgModule({
  imports: [
    MdTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PeriodStatisticsComponent
  ],
  providers: [
    PeriodStatisticsService,
    PeriodStatisticsTableService
  ]
})
export class PeriodStatisticsModule {
}
