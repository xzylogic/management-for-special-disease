import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthServiceComponent } from './health-service.component';
import { HealthServiceEditComponent } from './health-service-edit/health-service-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { HealthServiceService } from './_service/health-service.service';
import { HealthServiceFormService } from './_service/health-service-form.service';
import { HealthServiceTableService } from './_service/health-service-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthServiceComponent
}];

@NgModule({
  imports: [
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
export class HealthServiceModule {
}
