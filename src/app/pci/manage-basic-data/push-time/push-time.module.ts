import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { PushTimeComponent } from './push-time.component';
import { PushTimeEditComponent } from './push-time-edit/push-time-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { PushTimeService } from './_service/push-time-service.service';
import { PushTimeTableService } from './_service/push-time-service-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: PushTimeComponent
}];

@NgModule({
  imports: [
    FormsModule,
    MdChipsModule,
    MdTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PushTimeComponent,
    PushTimeEditComponent
  ],
  providers: [
    PushTimeService,
    PushTimeTableService
  ]
})
export class PushTimeModule {
}
