import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ServiceSpecComponent } from './service-spec.component';
import { ServiceSpecEditComponent } from './service-spec-edit';

import { ServiceSpecService, ServiceSpecTableService } from './_service';

import {
  DynamicTableModule,
  DynamicFormModule,
  EditModule,
  ModalModule
} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: ServiceSpecComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DynamicFormModule,
    DynamicTableModule,
    EditModule,
    ModalModule
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
