import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CommodityComponent } from './commodity.component';
import { CommodityEditComponent } from './commodity-edit';

import { CommodityService, CommodityFormService, CommodityTableService } from './_service';

import { DynamicTableModule, TabModule, ModalModule, EditModule } from '../../shared';
import { AuthService } from "../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: CommodityComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
    ModalModule,
    EditModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CommodityComponent,
    CommodityEditComponent
  ],
  providers: [
    CommodityService,
    CommodityFormService,
    CommodityTableService
  ]
})
export class CommodityModule {}
