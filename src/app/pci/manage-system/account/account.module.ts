import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { AccountComponent } from './account.component';
// import { AuthGuardService } from '../_service/data-collection.service';
// import { AuthGuardService } from '../../../pci/_service/auth-guard.service';
import { AccountService } from './_service/account.service';
import { AccountTableService } from './_service/account-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';
import {AccountConfigComponent} from "./account-config/account-config.component";
import {AccountEditComponent} from "./account-edit/account-edit.component";

const routes: Routes = [{
  path: '',
  // canActivate: [AuthGuardService],
  component: AccountComponent
}, {
  path: 'config',
  component: AccountConfigComponent
}, {
  path: 'edit',
  component: AccountEditComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AccountComponent,
    AccountConfigComponent,
    AccountEditComponent
  ],
  providers: [
    AccountService,
    AccountTableService,
    {provide: 'account', useClass: AccountService}
  ]
})
export class AccountModule {
}
