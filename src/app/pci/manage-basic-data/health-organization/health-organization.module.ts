import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HealthOrganizationComponent } from './health-organization.component';
import { HealthOrganizationEditComponent } from './health-organization-edit';

import { HealthOrganizationService, HealthOrganizationFormService, HealthOrganizationTableService } from './_service';

import { DynamicTableModule, TabModule, DynamicFormModule, EditModule, ModalModule} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HealthOrganizationComponent
}];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule, EditModule, ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthOrganizationComponent,
    HealthOrganizationEditComponent
  ],
  providers: [
    HealthOrganizationService,
    HealthOrganizationFormService,
    HealthOrganizationTableService
  ]
})
export class HealthOrganizationModule {}
