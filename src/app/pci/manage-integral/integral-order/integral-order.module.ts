import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IntegralOrderComponent } from './integral-order.component';

import {
  IntegralOrderService,
  IntegralOrderTableService
} from './_service';

import {
  DynamicTableModule,
  DynamicFormModule,
  TabModule,
  ModalModule
} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: IntegralOrderComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableModule,
    DynamicFormModule,
    TabModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralOrderComponent
  ],
  providers: [
    IntegralOrderService,
    IntegralOrderTableService
  ]
})
export class IntegralOrderModule {}
