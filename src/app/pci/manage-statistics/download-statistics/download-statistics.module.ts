import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  DynamicTableModule,
  ModalModule,
  TabModule
} from '../../../shared';

import { DownloadStatisticsComponent } from './download-statistics.component';
import { DownloadStatisticsService, DownloadStatisticsTableService } from './_service';
import { AuthService } from "../../_services/auth";

const routes: Routes = [
  {
    path: '',
    component: DownloadStatisticsComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynamicTableModule,
    ModalModule,
    TabModule,
    FormsModule
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
