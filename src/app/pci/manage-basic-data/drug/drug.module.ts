import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrugComponent } from './drug.component';
import { DrugEditComponent } from './drug-edit/drug-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DrugService } from './_service/drug.service';
import { DrugFormService } from './_service/drug-form.service';
import { DrugTableService } from './_service/drug-table.service';

export const routes: Routes = [{
  path: '',
  component: DrugComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: DrugEditComponent,
    canActivate: [AuthGuardService]
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    DrugComponent,
    DrugEditComponent
  ],
  providers: [
    DrugService,
    DrugFormService,
    DrugTableService
  ]
})
export class DrugModule {
}
