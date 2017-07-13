import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsClassifyComponent } from './news-classify.component';
import { NewsClassifyEditComponent } from './news-classify-edit/news-classify-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { NewsClassifyService } from './_service/news-classify.service';
import { NewsClassifyFormService } from './_service/news-classify-form.service';
import { NewsClassifyTableService } from './_service/news-classify-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: NewsClassifyComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    NewsClassifyComponent,
    NewsClassifyEditComponent
  ],
  providers: [
    NewsClassifyService,
    NewsClassifyFormService,
    NewsClassifyTableService
  ]
})
export class NewsClassifyModule {
}
