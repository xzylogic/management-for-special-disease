import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'commodity',
  loadChildren: 'app/pci/manage-commodity/commodity.module#CommodityModule'
}];
