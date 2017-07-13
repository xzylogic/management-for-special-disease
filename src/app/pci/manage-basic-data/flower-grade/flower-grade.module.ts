import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { FlowerGradeComponent } from './flower-grade.component';
import { FlowerGradeEditComponent } from './flower-grade-edit/flower-grade-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { FlowerGradeService } from './_service/flower-grade.service';
import { FlowerGradeFormService } from './_service/flower-grade-form.service';
import { FlowerGradeTableService } from './_service/flower-grade-table.service';

const routes: Routes = [{
  path: '',
  component: FlowerGradeComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: FlowerGradeEditComponent,
    canActivate: [AuthGuardService]
  }]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FlowerGradeComponent,
    FlowerGradeEditComponent
  ],
  providers: [
    FlowerGradeService,
    FlowerGradeFormService,
    FlowerGradeTableService
  ]
})
export class FlowerGradeModule {
}
