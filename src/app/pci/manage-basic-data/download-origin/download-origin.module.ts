import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DownloadOriginComponent } from './download-origin.component';
import { DownloadOriginEditComponent } from './download-origin-edit/download-origin-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { DownloadOriginService } from './_service/download-origin.service';
import { DownloadOriginTableService } from './_service/download-origin-table.service';
import { DownloadOriginFormService } from './_service/download-origin-form.service';

const routes: Routes = [{
  path: '',
  component: DownloadOriginComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'edit',
    component: DownloadOriginEditComponent,
    canActivate: [AuthGuardService],
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    DownloadOriginComponent,
    DownloadOriginEditComponent
  ],
  providers: [
    DownloadOriginService,
    DownloadOriginTableService,
    DownloadOriginFormService
  ]
})
export class DownloadOriginModule {
}
