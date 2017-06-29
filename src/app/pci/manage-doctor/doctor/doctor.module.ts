import { NgModule } from '@angular/core';
import { DoctorComponent } from './doctor.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../_service/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorComponent
  ],
  providers: []
})
export class DoctorModule {
}
