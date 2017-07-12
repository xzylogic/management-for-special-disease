import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HealthServiceComponent } from './health-service.component';

import { HealthServiceEditComponent } from './health-service-edit';

import { HealthServiceService, HealthServiceFormService, HealthServiceTableService } from './_service';

import { DynamicTableModule, TabModule,DynamicFormModule, EditModule, ModalModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HealthServiceComponent
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
    HealthServiceComponent,
    HealthServiceEditComponent
  ],
  providers: [
    HealthServiceService,
    HealthServiceFormService,
    HealthServiceTableService
  ]
})
export class HealthServiceModule {}
