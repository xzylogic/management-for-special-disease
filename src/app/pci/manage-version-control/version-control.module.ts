import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { VersionControlComponent } from './version-control.component';
import { VersionControlEditComponent } from './version-control-edit';

import {
  VersionControlService,
  VersionControlFormService,
  VersionControlTableService
} from './_service';

import {
  DynamicTableModule,
  DynamicFormModule,
  EditModule,
  ModalModule
} from '../../shared';
import { AuthService } from "../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: VersionControlComponent
}];

@NgModule({
  imports: [
    CommonModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
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
export class VersionControlModule {}
