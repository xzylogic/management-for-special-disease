import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: 'app/container/group-user/user/user.module#UserModule'
  },
  {
    path: 'user-order',
    loadChildren: 'app/container/group-user/user-order/user-order.module#UserOrderModule'
  },
  {
    path: 'user-certification',
    loadChildren: 'app/container/group-user/user-certification/user-certification.module#UserCertificationModule'
  },
  {
    path: 'health-data',
    loadChildren: 'app/container/group-user/health-data/health-data.module#HealthDataModule'
  }
];