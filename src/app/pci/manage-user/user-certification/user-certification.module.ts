import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdChipsModule, MdGridListModule, MdListModule, MdTabsModule } from '@angular/material';

import { DTableModule, LibModule } from '../../../libs';

import { UserCertificationComponent } from './user-certification.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { UserCertificationService } from './_service/user-certification.service';
import { UserCertificationTableService } from './_service/user-certification-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: UserCertificationComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    MdGridListModule,
    MdListModule,
    FormsModule,
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
