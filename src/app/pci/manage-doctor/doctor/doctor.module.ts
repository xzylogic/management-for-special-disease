import { NgModule } from '@angular/core';
import { DoctorComponent } from './doctor.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorService } from './_service/doctor.service';
import { DoctorFormService } from './_service/doctor-form.service';
import { DoctorTableService } from './_service/doctor-table.service';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { DTableModule } from '../../../libs/dtable/dtable.module';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'edit',
  component: DoctorEditComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'message',
  component: SendMessageComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    DTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DoctorComponent,
    DoctorEditComponent,
    SendMessageComponent
  ],
  providers: [
    DoctorService,
    DoctorTableService,
    DoctorFormService,
  ]
})
export class DoctorModule {
}
