import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DoctorServiceComponent } from './doctor-service.component';
import { DoctorServiceEditComponent } from './doctor-service-edit/doctor-service-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorServiceService } from './_service/doctor-service.service';
import { DoctorServiceTableService } from './_service/doctor-service-table.service';

const routes: Routes = [{
  path: '',
  component: DoctorServiceComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: DoctorServiceEditComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorServiceComponent,
    DoctorServiceEditComponent,
  ],
  providers: [
    DoctorServiceService,
    DoctorServiceTableService
  ]
})
export class DoctorServiceModule {
}
