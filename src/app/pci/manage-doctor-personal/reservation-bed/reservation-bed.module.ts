/**
 * Created by zhanglin on 2017/7/31.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdChipsModule, MdGridListModule, MdListModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { ReservationBedComponent } from './reservation-bed.component';
import { ReservationBedService } from './_service/reservation-bed.service';
import { ReservationBedTableService } from './_service/reservation-bed-table.service';
import { FormsModule } from '@angular/forms';


const routes: Routes = [{
  path: '',
  component: ReservationBedComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    MdGridListModule,
    MdListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReservationBedComponent
  ],
  providers: [
    ReservationBedService,
    ReservationBedTableService
  ]
})
export class ReservationBedModule {
}
