import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'data-collection',
    loadChildren: 'app/shared/manage-data-collection/data-collection.module#DataCollectionModule'
  }
];
