import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { IntegralDetailComponent } from './integral-detail/integral-detail.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { UserService } from './_service/user.service';
import { UserFormService } from './_service/user-form.service';
import { UserTableService } from './_service/user-table.service';
import { UserIntegralDetailTableService } from './_service/user-integral-detail-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: UserComponent
}, {
  path: 'edit',
  component: UserEditComponent,
  canActivate: [AuthGuardService],
}, {
    path: 'integral',
    component: IntegralDetailComponent,
    canActivate: [AuthGuardService],
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
    UserComponent,
    UserEditComponent,
    IntegralDetailComponent
  ],
  providers: [
    UserService,
    UserFormService,
    UserTableService,
    UserIntegralDetailTableService
  ]
})
export class UserModule {
}
