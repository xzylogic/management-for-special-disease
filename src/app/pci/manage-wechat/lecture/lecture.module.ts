import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LectureComponent } from './lecture.component';
import { LectureEditComponent } from './lecture-edit/lecture-edit.component';
import { LectureSignComponent } from './lecture-sign/lecture-sign.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { LectureService } from './_service/lecture.service';
import { LectureFormService } from './_service/lecture-form.service';
import { LectureTableService } from './_service/lecture-table.service';
import { LectureAuditingTableService } from './_service/lecture-auditing-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: LectureComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    LectureComponent,
    LectureEditComponent,
    LectureSignComponent
  ],
  providers: [
    LectureService,
    LectureFormService,
    LectureTableService,
    LectureAuditingTableService
  ]
})
export class LectureModule {
}
