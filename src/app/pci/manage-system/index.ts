import { Routes } from '@angular/router';

import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: 'app/pci/manage-system/account/account.module#AccountModule'
  },{
    path: 'role',
    loadChildren: 'app/pci/manage-system/role/role.module#RoleModule'
  },{
    path: 'menu',
    loadChildren: 'app/pci/manage-system/menu/menu.module#MenuModule'
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

