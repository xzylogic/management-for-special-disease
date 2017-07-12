import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {MomentModule} from 'angular2-moment';

import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit';
import { IntegralDetailComponent } from "./integral-detail";

import { UserService, UserFormService, UserTableService, UserIntegralDetailTableService } from './_service';

import { DynamicTableModule, TabModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: UserComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
    IntegralDetailComponent
  ],
  providers: [
    UserService,
    UserFormService,
    UserTableService,
    UserIntegralDetailTableService
  ]
})
export class UserModule {}
