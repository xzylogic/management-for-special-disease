import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic-service',
    loadChildren: 'app/container/group-service/basic-service/basic-service.module#BasicServiceModule'
  },
  {
    path: 'health-service',
    loadChildren: 'app/container/group-service/health-service/health-service.module#HealthServiceModule'
  },
  {
    path: 'package-service',
    loadChildren: 'app/container/group-service/package-service/package-service.module#PackageServiceModule'
  },
  {
    path: 'service-spec',
    loadChildren: 'app/container/group-service/service-spec/service-spec.module#ServiceSpecModule'
  }
];