import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {MomentModule} from 'angular2-moment';

import { HealthDataComponent } from './health-data.component';

import { HealthDataService, HealthDataTableService } from './_service';

import { DynamicTableModule, TabModule, DynamicFormModule, EditModule, ModalModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: HealthDataComponent
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
    HealthDataComponent
  ],
  providers: [
    HealthDataService,
    HealthDataTableService
  ]
})
export class HealthDataModule {}
