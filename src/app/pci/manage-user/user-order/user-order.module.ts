import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdListModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { UserOrderComponent } from './user-order.component';
import { UserOrderRecordComponent } from './user-order-record/user-order-record.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { UserOrderService } from './_service/user-order.service';
import { UserOrderTableService } from './_service/user-order-table.service';
import { ServiceRecordTableService } from './_service/service-record-table.service';
import { ServiceRecordFormService } from './_service/service-record-form.service';
import { OrderDetailModule } from './order-detail/order-detail.module';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: UserOrderComponent
}, {
  path: 'edit',
  component: UserOrderRecordComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    FormsModule,
    MdChipsModule,
    MdTabsModule,
    // MdListModule,
    DTableModule,
    DFormModule,
    LibModule,
    OrderDetailModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserOrderComponent,
    UserOrderRecordComponent,
    // OrderDetailComponent
  ],
  entryComponents: [
    // OrderDetailComponent
  ],
  providers: [
    UserOrderService,
    UserOrderTableService,
    ServiceRecordTableService,
    ServiceRecordFormService
  ]
})
export class UserOrderModule {
}
