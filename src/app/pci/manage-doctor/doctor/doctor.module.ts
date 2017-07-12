import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DoctorComponent } from './doctor.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { DoctorIntegralComponent } from './doctor-integral/doctor-integral.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorService } from './_service/doctor.service';
import { DoctorFormService } from './_service/doctor-form.service';
import { DoctorTableService } from './_service/doctor-table.service';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: DoctorEditComponent,
    canActivate: [AuthGuardService],
  }, {
    path: 'message',
    component: SendMessageComponent,
    canActivate: [AuthGuardService],
  }, {
    path: 'integral',
    component: DoctorIntegralComponent,
    canActivate: [AuthGuardService],
  }]
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
    DoctorComponent,
    DoctorEditComponent,
    SendMessageComponent,
    DoctorIntegralComponent
  ],
  providers: [
    DoctorService,
    DoctorTableService,
    DoctorFormService
  ]
})
export class DoctorModule {
}
