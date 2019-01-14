import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { SmsModelComponent } from './sms-model.component';
// import { AuthGuardService } from '../_service/data-collection.service';
// import { AuthGuardService } from '../../../pci/_service/auth-guard.service';
import { SmsModelService } from './_service/sms-model.service';
import { SmsModelTableService } from './_service/sms-model-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';
import {SmsModelConfigComponent} from "./sms-model-config/sms-model-config.component";

const routes: Routes = [{
  path: '',
  // canActivate: [AuthGuardService],
  component: SmsModelComponent
}, {
  path: 'config',
  component: SmsModelConfigComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SmsModelComponent,
    SmsModelConfigComponent
  ],
  providers: [
    SmsModelService,
    SmsModelTableService,
    {provide: 'sms-model', useClass: SmsModelService}
  ]
})
export class SmsModelModule {
}
