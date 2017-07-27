import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { FlowerGradeComponent } from './flower-grade.component';
import { FlowerGradeEditComponent } from './flower-grade-edit/flower-grade-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { FlowerGradeService } from './_service/flower-grade.service';
import { FlowerGradeFormService } from './_service/flower-grade-form.service';
import { FlowerGradeTableService } from './_service/flower-grade-table.service';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: FlowerGradeComponent,
  canActivate: [AuthGuardService]},
  {
    path: 'edit',
    component: FlowerGradeEditComponent,
    canActivate: [AuthGuardService]
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
