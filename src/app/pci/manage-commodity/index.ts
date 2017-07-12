import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'commodity',
    loadChildren: 'app/container/group-commodity/commodity.module#CommodityModule'
  }
];