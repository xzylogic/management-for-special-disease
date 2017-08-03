/**
 * Created by zhanglin on 2017/8/1.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdChipsModule, MdTabsModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../../libs';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { CounselingProblemComponent } from './counseling-problem.component';
import { CounselingProblemService } from './_service/counseling-problem.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: CounselingProblemComponent
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
    CounselingProblemComponent
  ],
  providers: [
    CounselingProblemService
  ]
})
export class CounselingProblemModule {
}
