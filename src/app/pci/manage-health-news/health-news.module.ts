import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HealthNewsComponent } from './health-news.component';
import { HealthNewsEditComponent } from './health-news-edit/health-news-edit.component';
import { ReadingQuantityComponent } from './reading-quantity/reading-quantity.component';

import { AuthGuardService } from '../_service/auth-guard.service';
import { HealthNewsService } from './_service/health-news.service';
import { HealthNewsFormService } from './_service/health-news-form.service';
import { HealthNewsTableService } from './_service/health-news-table.service';
import { ReadCoefficientFormService } from './_service/reading-quantity-form.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthNewsComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthNewsComponent,
    HealthNewsEditComponent,
    ReadingQuantityComponent
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
