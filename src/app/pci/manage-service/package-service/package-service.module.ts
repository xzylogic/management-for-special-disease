import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PackageServiceComponent } from './package-service.component';

import { PackageServiceEditNewComponent } from './package-service-edit-new';
import { PackageServiceEditComponent } from './package-service-edit';

import {
  PackageServiceService,
  PackageServiceFormService,
  PackageServiceTableService
} from './_service';
import { ServiceSpecService } from '../service-spec/_service';

import { DynamicTableModule, TabModule ,DynamicFormModule, EditModule, ModalModule} from '../../../shared';
import { AuthService } from "../../_services/auth";
import { CommonService } from "../../_services/common.service";

export const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: PackageServiceComponent
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    PackageServiceComponent,
    PackageServiceEditComponent,
    PackageServiceEditNewComponent
  ],
  providers: [
    PackageServiceService,
    PackageServiceFormService,
    PackageServiceTableService,
    ServiceSpecService,
    CommonService
  ]
})
export class PackageServiceModule {}
