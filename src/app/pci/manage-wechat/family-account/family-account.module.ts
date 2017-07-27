import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { FamilyAccountComponent } from './family-account.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { FamilyAccountService } from './_service/family-account.service';
import { FamilyAccountTableService } from './_service/family-account-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FamilyAccountComponent
}];

@NgModule({
  imports: [
    FormsModule,
    MdChipsModule,
    MdTabsModule,
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FamilyAccountComponent
  ],
  providers: [
    FamilyAccountService,
    FamilyAccountTableService
  ]
})
export class FamilyAccountModule {
}
