import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCollectionComponent } from './data-collection.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    DataCollectionComponent
  ],
  providers: []
})
export class DataCollectionModule {
}
