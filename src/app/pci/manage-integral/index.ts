import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

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

export const stores = {
  integralCommodity: createReducer('integralCommodity', [0], {}),
  integralOrder: createReducer('integralOrder', [0], {}),
  integralDetail: createReducer('integralDetail', [0], {})
};
