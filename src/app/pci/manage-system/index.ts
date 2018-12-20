import { Routes } from '@angular/router';

// import { createReducer } from '../../pci/_store/api/api.reducer';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/pci/manage-system/account/account.module#AccountModule'
  }
];

// export const stores = {
//   dataCollection: createReducer(
//     'dataCollection',
//     [0, 0, 0, 0, 0, 0],
//     {
//       scrollTops: [0, 0, 0, 0, 0, 0],
//       datas: [null, null, null, null, null, null],
//       pages: [1, 1, 1, 1, 1, 1]
//     }
//   ),
// };

