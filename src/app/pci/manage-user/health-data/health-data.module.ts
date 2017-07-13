import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthDataComponent } from './health-data.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { HealthDataService } from './_service/health-data.service';
import { HealthDataTableService } from './_service/health-data-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthDataComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthDataComponent
  ],
  providers: [
    HealthDataService,
    HealthDataTableService
  ]
})
export class HealthDataModule {
}
