import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DoctorGroupComponent } from './doctor-group.component';
import { DoctorGroupEditComponent } from './doctor-group-edit/doctor-group-edit.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorGroupService } from './_service/doctor-group.service';
import { DoctorGroupFormService } from './_service/doctor-group-form.service';
import { DoctorGroupTableService } from './_service/doctor-group-table.service';
import { AuditingServiceTableService } from './_service/auditing-service-table.service';
import { ServiceDetailTableService } from './_service/service-detail-table.service';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [{
  path: '',
  component: DoctorGroupComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: DoctorGroupEditComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'service',
  component: ServiceDetailComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'service-list',
  component: ServiceListComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorGroupComponent,
    DoctorGroupEditComponent,
    ServiceDetailComponent,
    ServiceListComponent
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
