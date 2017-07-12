import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { AdPatientComponent } from './ad-patient.component';
import { AdPatientEditComponent } from './ad-patient-edit/ad-patient-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { AdPatientService } from './_service/ad-patient.service';
import { AdPatientFormService } from './_service/ad-patient-form.service';
import { AdPatientTableService } from './_service/ad-patient-table.service';

const routes: Routes = [{
  path: '',
  component: AdPatientComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: AdPatientEditComponent,
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
    AdPatientComponent,
    AdPatientEditComponent
  ],
  providers: [
    AdPatientService,
    AdPatientFormService,
    AdPatientTableService
  ]
})
export class AdPatientModule {
}
