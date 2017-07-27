import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { ActivenessStatisticsComponent } from './activeness-statistics.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { ActivenessStatisticsService } from './_service/activeness-statistics.service';
import { ActivenessStatisticsTableService } from './_service/activeness-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: ActivenessStatisticsComponent
}];

@NgModule({
  imports: [
    FormsModule,
    MdTabsModule,
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivenessStatisticsComponent
  ],
  providers: [
    ActivenessStatisticsService,
    ActivenessStatisticsTableService
  ]
})
export class ActivenessStatisticsModule {
}
