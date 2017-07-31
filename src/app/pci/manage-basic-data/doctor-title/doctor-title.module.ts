import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DoctorTitleComponent } from './doctor-title.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorTitleService } from './_service/doctor-title.service';
import { DoctorTitleTableService } from './_service/doctor-title-table.service';
import { DTableModule, LibModule } from '../../../libs';

const routes: Routes = [{
  path: '',
  component: DoctorTitleComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    LibModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorTitleComponent
  ],
  providers: [
    DoctorTitleService,
    DoctorTitleTableService
  ]
})
export class DoctorTitleModule {
}
