import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdToolbarModule } from '@angular/material';
import { LibInputModule } from '../../libs/dform/lib-input.module';
import { LoginComponent } from './login.component';
import { LibDialogModule } from '../../libs/dmodal/dialog/dialog.module';
import { AuthService } from '../_service/auth.service';

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
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule {
}
