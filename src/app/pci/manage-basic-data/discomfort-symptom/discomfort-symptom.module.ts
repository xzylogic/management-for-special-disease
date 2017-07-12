import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DTableModule, DFormModule, LibModule } from '../../../libs';

import { DiscomfortSymptomComponent } from './discomfort-symptom.component';
import { DiscomfortSymptomEditComponent } from './discomfort-symptom-edit/discomfort-symptom-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DiscomfortSymptomService } from './_service/discomfort-symptom.service';
import { DiscomfortSymptomFormService } from './_service/discomfort-symptom-form.service';
import { DiscomfortSymptomTableService } from './_service/discomfort-symptom-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: DiscomfortSymptomComponent,
  children: [{
    path: 'edit',
    canActivate: [AuthGuardService],
    component: DiscomfortSymptomEditComponent
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
    DiscomfortSymptomComponent,
    DiscomfortSymptomEditComponent
  ],
  providers: [
    DiscomfortSymptomService,
    DiscomfortSymptomFormService,
    DiscomfortSymptomTableService
  ]
})
export class DiscomfortSymptomModule {
}
