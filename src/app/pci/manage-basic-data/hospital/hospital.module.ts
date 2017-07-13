import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HospitalComponent } from './hospital.component';
import { HospitalEditComponent } from './hospital-edit/hospital-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { HospitalService } from './_service/hospital.service';
import { HospitalFormService } from './_service/hospital-form.service';
import { HospitalTableService } from './_service/hospital-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HospitalComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    HospitalComponent,
    HospitalEditComponent
  ],
  providers: [
    HospitalService,
    HospitalFormService,
    HospitalTableService
  ]
})
export class HospitalModule {
}
