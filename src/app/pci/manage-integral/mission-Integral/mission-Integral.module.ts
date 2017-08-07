import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdDialogModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { MissionIntegralComponent, DialogSigninComponent, DialogRecordComponent, DialogElseComponent} from './mission-Integral.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { MissionIntegralService } from './_service/mission-Integral.service';
import { MissionIntegralTableService } from './_service/mission-Integral-table.service';

const routes: Routes = [{
  path: '',
  component: MissionIntegralComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    MdDialogModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MissionIntegralComponent,
    DialogSigninComponent,
    DialogRecordComponent,
    DialogElseComponent,
  ],
  providers: [
    MissionIntegralService,
    MissionIntegralTableService
  ],
  entryComponents: [DialogSigninComponent, DialogRecordComponent, DialogElseComponent]
})
export class MissionIntegralModule {
}
