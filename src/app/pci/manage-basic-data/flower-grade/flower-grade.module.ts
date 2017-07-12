import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FlowerGradeComponent } from './flower-grade.component';
import { FlowerGradeEditComponent } from './flower-grade-edit/flower-grade-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { FlowerGradeService } from './_service/flower-grade.service';
import { FlowerGradeFormService } from './_service/flower-grade-form.service';
import { FlowerGradeTableService } from './_service/flower-grade-table.service';


const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FlowerGradeComponent
}];

@NgModule({
  imports: [
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
export class FlowerGradeModule {}
