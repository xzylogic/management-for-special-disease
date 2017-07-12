import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DepartmentComponent } from './department.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DepartmentService } from './_service/department.service';
import { DepartmentFormService } from './_service/department-form.service';
import { DepartmentTableService } from './_service/department-table.service';

const routes: Routes = [{
  path: '',
  component: DepartmentComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: DepartmentEditComponent,
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
    DepartmentComponent,
    DepartmentEditComponent
  ],
  providers: [
    DepartmentService,
    DepartmentFormService,
    DepartmentTableService
  ]
})
export class DepartmentModule {
}
