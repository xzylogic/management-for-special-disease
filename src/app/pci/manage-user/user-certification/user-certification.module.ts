import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, LibModule } from '../../../libs';

import { UserCertificationComponent } from './user-certification.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { UserCertificationService } from './_service/user-certification.service';
import { UserCertificationTableService } from './_service/user-certification-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: UserCertificationComponent
}];

@NgModule({
  imports: [
    MdChipsModule,
    MdTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserCertificationComponent
  ],
  providers: [
    UserCertificationService,
    UserCertificationTableService
  ]
})
export class UserCertificationModule {
}
