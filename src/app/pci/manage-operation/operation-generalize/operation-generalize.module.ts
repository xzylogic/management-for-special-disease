import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { OperationGeneralizeComponent } from './operation-generalize.component';
// import { OperationGeneralizeEditComponent } from './operation-generalize-edit/operation-generalize-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { OperationGeneralizeService } from './_service/operation-generalize-service.service';
import { OperationGeneralizeTableService } from './_service/operation-generalize-service-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: OperationGeneralizeComponent
}/*, {
  path: 'edit',
  component: OperationGeneralizeEditComponent,
  canActivate: [AuthGuardService],
}*/];

@NgModule({
  imports: [
    MatTabsModule,
    DTableModule,
    DFormModule,
    FormsModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OperationGeneralizeComponent,
    // OperationGeneralizeEditComponent
  ],
  providers: [
    OperationGeneralizeService,
    OperationGeneralizeTableService,
  ]
})
export class OperationGeneralizeModule {
}
