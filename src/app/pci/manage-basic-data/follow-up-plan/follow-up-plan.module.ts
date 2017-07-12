import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FollowUpPlanComponent } from './follow-up-plan.component';

import { FollowUpPlanEditComponent } from './follow-up-plan-edit';

import { FollowUpPlanService, FollowUpPlanTableService } from './_service';

import { DynamicTableModule, TabModule, ModalModule } from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: FollowUpPlanComponent
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabModule,
    DynamicTableModule,
    ModalModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FollowUpPlanComponent,
    FollowUpPlanEditComponent
  ],
  providers: [
    FollowUpPlanService,
    FollowUpPlanTableService
  ]
})
export class FollowUpPlanModule {}
