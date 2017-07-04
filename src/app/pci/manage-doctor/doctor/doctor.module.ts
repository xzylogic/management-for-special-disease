import { NgModule } from '@angular/core';
import { DoctorComponent, DoctorOutletComponent } from './doctor.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorService } from './_service/doctor.service';
import { DoctorFormService } from './_service/doctor-form.service';
import { DoctorTableService } from './_service/doctor-table.service';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { MdChipsModule, MdTabsModule } from '@angular/material';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { FormsModule } from '@angular/forms';
import { provideStore, StoreModule } from '@ngrx/store';
import { DoctorReducer } from './_store/doctor.reducer';

const routes: Routes = [{
  path: 'doctor',
  component: DoctorOutletComponent,
  children: [{
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
  }]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MdTabsModule,
    MdChipsModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.provideStore({
      DoctorReducer
    })
  ],
  declarations: [
    DoctorOutletComponent,
    DoctorComponent,
    DoctorEditComponent,
    SendMessageComponent
  ],
  providers: [
    DoctorService,
    DoctorTableService,
    DoctorFormService,
    // provideStore({DoctorReducer})
  ]
})
export class DoctorModule {
}
