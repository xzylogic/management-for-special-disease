import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationPushComponent } from './operation-push.component';
import { OperationPushEditComponent } from './operation-push-edit/operation-push-edit.component';

import { AuthGuardService } from '../_service/auth-guard.service';
import { OperationPushService } from './_service/operation-push-service.service';
import { OperationPushTableService } from './_service/operation-push-service-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: OperationPushComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    OperationPushComponent,
    OperationPushEditComponent
  ],
  providers: [
    OperationPushService,
    OperationPushTableService
  ]
})
export class OperationPushModule {
}
