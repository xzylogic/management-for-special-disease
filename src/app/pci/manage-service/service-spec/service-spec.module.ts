import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceSpecComponent } from './service-spec.component';
import { ServiceSpecEditComponent } from './service-spec-edit/service-spec-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { ServiceSpecService } from './_service/service-spec.service';
import { ServiceSpecTableService } from './_service/service-spec-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: ServiceSpecComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
    ServiceSpecComponent,
    ServiceSpecEditComponent
  ],
  providers: [
    ServiceSpecService,
    ServiceSpecTableService
  ]
})
export class ServiceSpecModule {
}
