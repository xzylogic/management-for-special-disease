import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdDialogModule } from '@angular/material';

import { IntegralDetailComponent, DialogComponent } from './integral-detail.component';

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
    MdDialogModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralDetailComponent,
    DialogComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ],
  entryComponents: [DialogComponent]
})
export class IntegralDetailModule {
}
