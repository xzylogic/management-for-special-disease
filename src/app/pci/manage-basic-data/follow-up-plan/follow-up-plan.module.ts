import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowUpPlanComponent } from './follow-up-plan.component';
import { FollowUpPlanEditComponent } from './follow-up-plan-edit/follow-up-plan-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { FollowUpPlanService } from './_service/follow-up-plan.service';
import { FollowUpPlanTableService } from './_service/follow-up-plan-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FollowUpPlanComponent
}];

@NgModule({
  imports: [
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
export class FollowUpPlanModule {
}
