import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { CaseCountComponent } from './case-count.component';
// import { AuthGuardService } from '../_service/data-collection.service';
// import { AuthGuardService } from '../../../pci/_service/auth-guard.service';
import { CaseCountService } from './_service/case-count.service';
import { CaseCountTableService } from './_service/case-count-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';
import {DataCollectionComponent} from "../data-collection.component";

const routes: Routes = [{
  path: '',
  // canActivate: [AuthGuardService],
  component: CaseCountComponent
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
    CaseCountComponent
  ],
  providers: [
    CaseCountService,
    CaseCountTableService
  ]
})
export class CaseCountModule {
}
