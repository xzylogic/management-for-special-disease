import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegralDetailComponent } from './integral-detail.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralDetailComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralDetailComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ]
})
export class IntegralDetailModule {
}
