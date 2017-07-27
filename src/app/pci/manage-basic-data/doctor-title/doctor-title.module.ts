import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorTitleComponent } from './doctor-title.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorTitleService } from './_service/doctor-title.service';
import { DoctorTitleTableService } from './_service/doctor-title-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: DoctorTitleComponent,
  canActivate: [AuthGuardService]}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorTitleComponent
  ],
  providers: [
    DoctorTitleService,
    DoctorTitleTableService
  ]
})
export class DoctorTitleModule {
}
