/**
 * Created by zhanglin on 2017/7/31.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdChipsModule, MdGridListModule, MdListModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { GreenChannelComponent } from './green-channel.component';
import { GreenChannelService } from './_service/green-channel.service';
import { GreenChannelTableService } from './_service/green-channel-table.service';
import { FormsModule } from '@angular/forms';


const routes: Routes = [{
  path: '',
  component: GreenChannelComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    MdGridListModule,
    MdListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GreenChannelComponent
  ],
  providers: [
    GreenChannelService,
    GreenChannelTableService
  ]
})
export class GreenChannelModule {
}
