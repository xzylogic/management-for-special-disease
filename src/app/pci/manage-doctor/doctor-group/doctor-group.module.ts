import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorGroupComponent } from './doctor-group.component';
import { DoctorGroupEditComponent } from './doctor-group-edit/doctor-group-edit.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorGroupService } from './_service/doctor-group.service';
import { DoctorGroupFormService } from './_service/doctor-group-form.service';
import { DoctorGroupTableService } from './_service/doctor-group-table.service';
import { AuditingServiceTableService } from './_service/auditing-service-table.service';
import { ServiceDetailTableService } from './_service/service-detail-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: DoctorGroupComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorGroupComponent,
    DoctorGroupEditComponent,
    ServiceDetailComponent
  ],
  providers: [
    DoctorGroupService,
    DoctorGroupFormService,
    DoctorGroupTableService,
    AuditingServiceTableService,
    ServiceDetailTableService
  ]
})
export class DoctorGroupModule {
}
