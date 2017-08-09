import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdDialogModule, MdChipsModule, MdTabsModule } from '@angular/material';

import { IntegralDetailComponent } from './integral-detail.component';
import { IntegralDetailEditComponent } from './integral-detail-edit/integral-detail-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';
import { DTableModule, DFormModule, LibModule } from '../../../libs';

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
    IntegralDetailEditComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ],
  entryComponents: [IntegralDetailEditComponent]
})
export class IntegralDetailModule {
}
