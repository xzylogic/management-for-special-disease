import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdTabsModule } from '@angular/material';

import { DTableModule, LibModule } from '../../../libs';

import { DownloadStatisticsComponent } from './download-statistics.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DownloadStatisticsService } from './_service/download-statistics.service';
import { DownloadStatisticsTableService } from './_service/download-statistics-table.service';

const routes: Routes = [
  {
    path: '',
    component: DownloadStatisticsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    MdTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DownloadStatisticsComponent
  ],
  providers: [
    DownloadStatisticsService,
    DownloadStatisticsTableService
  ]
})
export class DownloadStatisticsModule {
}
