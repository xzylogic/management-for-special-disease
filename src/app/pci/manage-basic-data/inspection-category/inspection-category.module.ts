import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InspectionCategoryComponent } from './inspection-category.component';
import { InspectionCategoryEditComponent } from './inspection-category-edit/inspection-category-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { InspectionCategoryService } from './_service/inspection-category.service';
import { InspectionCategoryTableService } from './_service/inspection-category-table.service';
import { InspectionCategoryFormService } from './_service/inspection-category-form.service';

const routes: Routes = [{
  path: '',
  component: InspectionCategoryComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InspectionCategoryComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  declarations: [
    InspectionCategoryComponent,
    InspectionCategoryEditComponent
  ],
  providers: [
    InspectionCategoryService,
    InspectionCategoryTableService,
    InspectionCategoryFormService
  ]
})
export class InspectionCategoryModule {

}
