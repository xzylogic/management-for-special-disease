import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdToolbarModule } from '@angular/material';

import { LibInputModule, LibDialogModule } from '../../libs';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [
    LibInputModule,
    LibDialogModule,
    MdToolbarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
