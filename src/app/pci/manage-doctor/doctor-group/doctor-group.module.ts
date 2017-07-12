import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DoctorGroupComponent } from './doctor-group.component';
import { DoctorGroupEditComponent } from './doctor-group-edit';
import { ServiceDetailComponent } from './service-detail';

import {
  DoctorGroupService,
  DoctorGroupFormService,
  DoctorGroupTableService,
  AuditingServiceTableService,
  ServiceDetailTableService
} from './_service';

import {
  TabModule,
  DynamicTableModule,
  DynamicFormModule,
  EditModule,
  ModalModule
} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: DoctorGroupComponent
}];


@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
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
export class DoctorGroupModule {}
