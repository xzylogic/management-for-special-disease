import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'user',
  loadChildren: 'app/pci/manage-user/user/user.module#UserModule'
}, {
  path: 'user-order',
  loadChildren: 'app/pci/manage-user/user-order/user-order.module#UserOrderModule'
}, {
  path: 'user-certification',
  loadChildren: 'app/pci/manage-user/user-certification/user-certification.module#UserCertificationModule'
}, {
  path: 'health-data',
  loadChildren: 'app/pci/manage-user/health-data/health-data.module#HealthDataModule'
}];
