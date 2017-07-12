import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserCertificationComponent } from './user-certification.component';

import { UserCertificationService, UserCertificationTableService } from './_service';

import { DynamicTableModule, DynamicFormModule, TabModule, ModalModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: UserCertificationComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    ModalModule,
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
export class UserCertificationModule {}
