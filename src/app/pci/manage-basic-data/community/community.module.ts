import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaiduMapModule  } from 'angular2-baidu-map';
import { MdDialogModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { CommunityComponent, DialogComponent } from './community.component';
import { CommunityEditComponent} from './community-edit/community-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { CommunityService } from './_service/community.service';
import { CommunityTableService } from './_service/community-table.service';

const routes: Routes = [{
  path: '',
  component: CommunityComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: CommunityEditComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    BaiduMapModule,
    MdDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CommunityComponent,
    CommunityEditComponent,
    DialogComponent
  ],
  providers: [
    CommunityService,
    CommunityTableService
  ],
  entryComponents: [DialogComponent]
})
export class CommunityModule {
}
