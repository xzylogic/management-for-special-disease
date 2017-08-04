import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdDialogModule, MdListModule } from '@angular/material';

import { OrderDetailComponent } from './order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdListModule
  ],
  declarations: [
    OrderDetailComponent
  ],
  entryComponents: [
    OrderDetailComponent
  ],
  exports: [
    OrderDetailComponent
  ]
})
export class OrderDetailModule {
}
