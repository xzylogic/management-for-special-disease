import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'integral-commodity',
  loadChildren: 'app/pci/manage-integral/integral-commodity/integral-commodity.module#IntegralCommodityModule'
}, {
  path: 'integral-order',
  loadChildren: 'app/pci/manage-integral/integral-order/integral-order.module#IntegralOrderModule'
}, {
  path: 'integral-detail',
  loadChildren: 'app/pci/manage-integral/integral-detail/integral-detail.module#IntegralDetailModule'
}];
