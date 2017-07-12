import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DoctorSortComponent } from './doctor-sort.component';
import { DoctorSortEditComponent } from './doctor-sort-edit/doctor-sort-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorSortService } from './_service/doctor-sort.service';
import { DoctorSortTableService } from './_service/doctor-sort-table.service';
import { DoctorSortFormService } from './_service/doctor-sort-form.service';

export const routes: Routes = [{
  path: '',
  component: DoctorSortComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: DoctorSortEditComponent,
    canActivate: [AuthGuardService]
  }]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorSortComponent,
    DoctorSortEditComponent
  ],
  providers: [
    DoctorSortService,
    DoctorSortTableService,
    DoctorSortFormService
  ]
})
export class DoctorSortModule {
}
