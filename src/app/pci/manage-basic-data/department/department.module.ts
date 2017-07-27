import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DepartmentComponent } from './department.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DepartmentService } from './_service/department.service';
import { DepartmentTableService } from './_service/department-table.service';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: DepartmentComponent,
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
    DepartmentComponent
  ],
  providers: [
    DepartmentService,
    DepartmentTableService
  ]
})
export class DepartmentModule {
}
