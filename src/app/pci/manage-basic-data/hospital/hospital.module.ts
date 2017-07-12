import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HospitalComponent } from './hospital.component';

import { HospitalEditComponent } from './hospital-edit';

import { HospitalService, HospitalFormService, HospitalTableService } from './_service';

import { DynamicTableModule, TabModule ,DynamicFormModule, EditModule, ModalModule} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HospitalComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    DynamicFormModule,
    EditModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HospitalComponent,
    HospitalEditComponent
  ],
  providers: [
    HospitalService,
    HospitalFormService,
    HospitalTableService
  ]
})
export class HospitalModule {}
