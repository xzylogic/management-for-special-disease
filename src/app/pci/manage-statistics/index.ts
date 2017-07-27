import { Routes } from '@angular/router';
import { createReducer } from '../_store/api/api.reducer';

export const routes: Routes = [{
  path: 'activeness-statistics',
  loadChildren: 'app/pci/manage-statistics/activeness-statistics/activeness-statistics.module#ActivenessStatisticsModule'
}, {
  path: 'register-statistics',
  loadChildren: 'app/pci/manage-statistics/register-statistics/register-statistics.module#RegisterStatisticsModule'
}, {
  path: 'period-statistics',
  loadChildren: 'app/pci/manage-statistics/period-statistics/period-statistics.module#PeriodStatisticsModule'
}, {
  path: 'business-statistics',
  loadChildren: 'app/pci/manage-statistics/business-statistics/business-statistics.module#BusinessStatisticsModule'
}, {
  path: 'download-statistics',
  loadChildren: 'app/pci/manage-statistics/download-statistics/download-statistics.module#DownloadStatisticsModule'
}, {
  path: 'father-statistics',
  loadChildren: 'app/pci/manage-statistics/father-statistics/father-statistics.module#FatherStatisticsModule'
}];

export const stores = {
  activenessStatistics: createReducer('activenessStatistics', [0, 0], {}),
  registerStatistics: createReducer('registerStatistics', [0, 0], {}),
  periodStatistics: createReducer('periodStatistics', [0, 0], {}),
  businessStatistics: createReducer('businessStatistics', [0, 0], {}),
  downloadStatistics: createReducer('downloadStatistics', [0, 0, 0], {}),
};
