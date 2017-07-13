import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomMenuComponent } from './custom-menu.component';
import { CustomMenuEditComponent } from './custom-menu-edit/custom-menu-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { CustomMenuService } from './_service/custom-menu.service';
import { CustomMenuFormService } from './_service/custom-menu-form.service';
import { CustomMenuTableService } from './_service/custom-menu-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: CustomMenuComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    CustomMenuComponent,
    CustomMenuEditComponent
  ],
  providers: [
    CustomMenuService,
    CustomMenuTableService,
    CustomMenuFormService
  ]
})
export class CustomMenuModule {
}
