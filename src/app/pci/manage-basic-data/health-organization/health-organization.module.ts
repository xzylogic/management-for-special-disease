import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthOrganizationComponent } from './health-organization.component';
import { HealthOrganizationEditComponent } from './health-organization-edit/health-organization-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { HealthOrganizationService } from './_service/health-organization.service';
import { HealthOrganizationFormService } from './_service/health-organization-form.service';
import { HealthOrganizationTableService } from './_service/health-organization-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthOrganizationComponent
}];

@NgModule({
  imports: [
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
export class HealthOrganizationModule {
}
