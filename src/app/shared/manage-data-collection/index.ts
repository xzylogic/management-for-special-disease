import { Routes } from '@angular/router';
import { AuthGuardService } from '../../medical-record/_service/auth-guard.service';

import { createReducer } from '../../pci/_store/api/api.reducer';

export const routes: Routes = [
  {
    path: 'data-collection',
    loadChildren: 'app/shared/manage-data-collection/data-collection.module#DataCollectionModule',
    canActivate: [AuthGuardService],
  }
];

export const stores = {
  dataCollection: createReducer('dataCollection', [0, 0, 0, 0], {}),
};

