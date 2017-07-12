import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BasicServiceComponent } from './basic-service.component';
import { BasicServiceEditComponent } from './basic-service-edit';

import {
  BasicServiceService,
  BasicServiceTableService,
  BasicServiceFormService
} from './_service';

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
  component: BasicServiceComponent
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
    BasicServiceComponent,
    BasicServiceEditComponent
  ],
  providers: [
    BasicServiceService,
    BasicServiceTableService,
    BasicServiceFormService
  ]
})
export class BasicServiceModule {}
