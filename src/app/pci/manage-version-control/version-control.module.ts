import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VersionControlComponent } from './version-control.component';
import { VersionControlEditComponent } from './version-control-edit/version-control-edit.component';

import { AuthGuardService } from '../_service/auth-guard.service';
import { VersionControlService } from './_service/version-control.service';
import { VersionControlFormService } from './_service/version-control-form.service';
import { VersionControlTableService } from './_service/version-control-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: VersionControlComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    VersionControlComponent,
    VersionControlEditComponent
  ],
  providers: [
    VersionControlService,
    VersionControlFormService,
    VersionControlTableService
  ]
})
export class VersionControlModule {
}
