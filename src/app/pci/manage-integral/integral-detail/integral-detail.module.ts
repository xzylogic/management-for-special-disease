import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IntegralDetailComponent } from './integral-detail.component';

import {
  IntegralDetailService,
  IntegralDetailTableService
} from './_service';

import {
  DynamicTableModule,
  ModalModule,
  TabModule
} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: IntegralDetailComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableModule,
    ModalModule,
    TabModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralDetailComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ]
})
export class IntegralDetailModule {}
