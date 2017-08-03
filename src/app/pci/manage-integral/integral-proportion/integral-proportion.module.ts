/**
 * Created by zhanglin on 2017/8/2.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralProportionService } from './_service/integral-proportion.service';
import { IntegralProportionComponent } from './integral-proportion.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralProportionComponent
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
    IntegralProportionComponent
  ],
  providers: [
    IntegralProportionService
  ]
})
export class IntegralProportionModule {
}
