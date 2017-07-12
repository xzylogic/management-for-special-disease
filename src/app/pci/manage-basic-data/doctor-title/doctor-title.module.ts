import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorTitleComponent } from './doctor-title.component';
import { DoctorTitleEditComponent } from './doctor-title-edit/doctor-title-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorTitleService } from './_service/doctor-title.service';
import { DoctorTitleFormService } from './_service/doctor-title-form.service';
import { DoctorTitleTableService } from './_service/doctor-title-table.service';

const routes: Routes = [{
  path: '',
  component: DoctorTitleComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: DoctorTitleEditComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorTitleComponent,
    DoctorTitleEditComponent
  ],
  providers: [
    DoctorTitleService,
    DoctorTitleFormService,
    DoctorTitleTableService
  ]
})
export class DoctorTitleModule {
}
