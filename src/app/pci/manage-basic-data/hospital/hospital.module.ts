import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HospitalComponent } from './hospital.component';
import { HospitalEditComponent } from './hospital-edit/hospital-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { HospitalService } from './_service/hospital.service';
import { HospitalFormService } from './_service/hospital-form.service';
import { HospitalTableService } from './_service/hospital-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HospitalComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: HospitalEditComponent
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
