import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'health-news',
  loadChildren: 'app/pci/manage-health-news/health-news.module#HealthNewsModule'
}];
