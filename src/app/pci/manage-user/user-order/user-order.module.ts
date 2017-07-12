import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserOrderComponent } from './user-order.component';
import { UserOrderRecordComponent } from './user-order-record';

import { UserOrderService, UserOrderTableService, ServiceRecordFormService, ServiceRecordTableService } from './_service';

import { DynamicTableModule, DynamicFormModule, TabModule, ModalModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: UserOrderComponent
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
    UserOrderComponent,
    UserOrderRecordComponent
  ],
  providers: [
    UserOrderService,
    UserOrderTableService,
    ServiceRecordTableService,
    ServiceRecordFormService
  ]
})
export class UserOrderModule {}
