import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { AdDoctorComponent } from './ad-doctor.component';
import { AdDoctorEditComponent } from './ad-doctor-edit/ad-doctor-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { AdDoctorService } from './_service/ad-doctor.service';
import { AdDoctorFormService } from './_service/ad-doctor-form.service';
import { AdDoctorTableService } from './_service/ad-doctor-table.service';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: AdDoctorComponent,
  canActivate: [AuthGuardService]
},
  {
    path: 'edit',
    component: AdDoctorEditComponent,
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
    AdDoctorComponent,
    AdDoctorEditComponent
  ],
  providers: [
    AdDoctorService,
    AdDoctorFormService,
    AdDoctorTableService
  ]
})
export class AdDoctorModule {
}
