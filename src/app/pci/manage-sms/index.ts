import { Routes } from '@angular/router';

import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [
  {
    path: 'sms-model',
    loadChildren: 'app/pci/manage-sms/sms-model/sms-model.module#SmsModelModule'
  }
];

export const stores = {
//   dataCollection: createReducer(
//     'dataCollection',
//     [0, 0, 0, 0, 0, 0],
//     {
//       scrollTops: [0, 0, 0, 0, 0, 0],
//       datas: [null, null, null, null, null, null],
//       pages: [1, 1, 1, 1, 1, 1]
//     }
//   ),
};

