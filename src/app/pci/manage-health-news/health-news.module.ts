import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '@angular/material';

import { DTableModule, DFormModule, LibModule } from '../../libs';

import { HealthNewsComponent } from './health-news.component';
import { HealthNewsEditComponent } from './health-news-edit/health-news-edit.component';

import { AuthGuardService } from '../_service/auth-guard.service';
import { HealthNewsService } from './_service/health-news.service';
import { HealthNewsFormService } from './_service/health-news-form.service';
import { HealthNewsTableService } from './_service/health-news-table.service';
import { ReadCoefficientFormService } from './_service/reading-quantity-form.service';

const routes: Routes = [{
  path: '',
  component: HealthNewsComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: HealthNewsEditComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    FormsModule,
    MdSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthNewsComponent,
    HealthNewsEditComponent
  ],
  providers: [
    HealthNewsService,
    HealthNewsFormService,
    HealthNewsTableService,
    ReadCoefficientFormService
  ]
})
export class HealthNewsModule {
}
