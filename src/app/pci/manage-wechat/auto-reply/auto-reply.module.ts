import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoReplyComponent } from './auto-reply.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { AutoReplyService } from './_service/auto-reply.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: AutoReplyComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    AutoReplyComponent
  ],
  providers: [
    AutoReplyService
  ]
})
export class AutoReplyModule {}
