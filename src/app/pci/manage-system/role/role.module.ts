import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { RoleComponent } from './role.component';
// import { AuthGuardService } from '../_service/data-collection.service';
// import { AuthGuardService } from '../../../pci/_service/auth-guard.service';
import { RoleService } from './_service/role.service';
import { RoleTableService } from './_service/role-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  // canActivate: [AuthGuardService],
  component: RoleComponent
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
    RoleComponent
  ],
  providers: [
    RoleService,
    RoleTableService
  ]
})
export class RoleModule {
}
