import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NewsClassifyComponent } from './news-classify.component';

import { NewsClassifyEditComponent } from './news-classify-edit';

import { NewsClassifyService, NewsClassifyFormService, NewsClassifyTableService } from './_service';

import { DynamicTableModule, TabModule , DynamicFormModule, EditModule, ModalModule} from '../../../shared';
import { AuthService } from "../../_services/auth";

const routes: Routes = [{
  path: '',
  canActivate: [AuthService],
  component: NewsClassifyComponent
}];

@NgModule({
  imports: [
    CommonModule,
    TabModule,
    DynamicTableModule,
     DynamicFormModule,
     EditModule,
     ModalModule,
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
export class NewsClassifyModule {}
