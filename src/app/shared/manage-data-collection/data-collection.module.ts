import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCollectionComponent } from './data-collection.component';
import { LibModule } from '../../libs/common/lib.module';
import { MdTabsModule } from '@angular/material';
import { DTableModule } from '../../libs/dtable/dtable.module';
import { DFormModule } from '../../libs/dform/dform.module';
import { DataCollectionService } from './_service/data-collection.service';
import { DataCollectionTableService } from './_service/data-collection-table.service';
import { DataCollectionDetailService } from './_service/data-collection-detail.service';
import { BriefDetailComponent } from './data-collection-detail/briefDetail/brief-detail.component';
import { MedicalDetailComponent } from './data-collection-detail/medicalDetail/medical-detail.component';
import { OtherDetailComponent } from './data-collection-detail/otherDetail/other-detail.component';
import { RecordDetailComponent } from './data-collection-detail/recordDetail/record-detail.component';
import { ReportDetailComponent } from './data-collection-detail/reportDetail/report-detail.component';

const routes: Routes = [{
  path: '',
  component: DataCollectionComponent
// }, {
//   path: 'detail/:id',
//   component: DataCollectionDetailComponent
// }, {
//   path: 'edit/:id',
//   component: DataCollectionEditComponent
}
];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    MdTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DataCollectionComponent,
    BriefDetailComponent,
    MedicalDetailComponent,
    OtherDetailComponent,
    RecordDetailComponent,
    ReportDetailComponent
  ],
  providers: [
    DataCollectionService,
    DataCollectionTableService,
    DataCollectionDetailService
  ]
})
export class DataCollectionModule {
}
