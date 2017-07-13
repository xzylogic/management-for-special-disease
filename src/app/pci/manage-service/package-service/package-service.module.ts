import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PackageServiceComponent } from './package-service.component';
import { PackageServiceEditComponent } from './package-service-edit/package-service-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { PackageServiceService } from './_service/package-service.service';
import { PackageServiceFormService } from './_service/package-service-form.service';
import { PackageServiceTableService } from './_service/package-service-table.service';
import { ServiceSpecService } from '../service-spec/_service/service-spec.service';

export const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: PackageServiceComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    PackageServiceComponent,
    PackageServiceEditComponent,
  ],
  providers: [
    PackageServiceService,
    PackageServiceFormService,
    PackageServiceTableService,
    ServiceSpecService
  ]
})
export class PackageServiceModule {
}
