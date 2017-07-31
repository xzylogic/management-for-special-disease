import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { AdPatientComponent } from './ad-patient.component';
import { AdPatientEditComponent } from './ad-patient-edit/ad-patient-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { AdPatientService } from './_service/ad-patient.service';
import { AdPatientTableService } from './_service/ad-patient-table.service';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: AdPatientComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'edit',
  component: AdPatientEditComponent,
  canActivate: [AuthGuardService]
}];

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
    AdPatientComponent,
    AdPatientEditComponent
  ],
  providers: [
    AdPatientService,
    AdPatientTableService
  ]
})
export class AdPatientModule {
}
