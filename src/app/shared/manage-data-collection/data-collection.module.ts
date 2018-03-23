import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibDialogEditModule } from '../../libs/dmodal/dialog-edit.module';
import { LibDialogModule } from '../../libs/dmodal/dialog.module';
import { InspectionCategoryService } from '../../pci/manage-basic-data/inspection-category/_service/inspection-category.service';
import { InspectionItemService } from '../../pci/manage-basic-data/inspection-item/_service/inspection-item.service';
import { DataCollectionDetailComponent } from './data-collection-detail/data-collection-detail.component';
import { EditFormComponent } from './data-collection-edit/editForm/edit-form.component';
import { ImageFormComponent } from './data-collection-edit/imageForm/image-form.component';
import { InspectionFormComponent } from './data-collection-edit/inspectionForm/inspection-form.component';
import { InspectionItemFormComponent } from './data-collection-edit/inspectionItemForm/inspection-item-form.component';
import { MedicineFormComponent } from './data-collection-edit/medicineForm/medicine-form.component';
import { ImageShowComponent } from './imageShow/imageShow.component';
import { UserInfoComponent } from './userInfo/userInfo.component';
import { DataCollectionEditComponent } from './data-collection-edit/data-collection-edit.component';
import { DataCollectionComponent } from './data-collection.component';
import { LibModule } from '../../libs/common/lib.module';
import { MatTabsModule } from '@angular/material';
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
}, {
  path: 'detail/:id',
  component: DataCollectionDetailComponent
}, {
  path: 'edit/:id',
  component: DataCollectionEditComponent
}
];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    DFormModule,
    LibDialogModule,
    LibDialogEditModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DataCollectionComponent,
    BriefDetailComponent,
    MedicalDetailComponent,
    OtherDetailComponent,
    RecordDetailComponent,
    ReportDetailComponent,
    DataCollectionDetailComponent,
    UserInfoComponent,
    EditFormComponent,
    ImageFormComponent,
    InspectionFormComponent,
    InspectionItemFormComponent,
    MedicineFormComponent,
    DataCollectionEditComponent,
    ImageShowComponent
  ],
  providers: [
    DataCollectionService,
    DataCollectionTableService,
    DataCollectionDetailService,
    InspectionCategoryService,
    InspectionItemService
  ]
})
export class DataCollectionModule {
}
