import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'basic-service',
  loadChildren: 'app/pci/manage-service/basic-service/basic-service.module#BasicServiceModule'
}, {
  path: 'health-service',
  loadChildren: 'app/pci/manage-service/health-service/health-service.module#HealthServiceModule'
}, {
  path: 'package-service',
  loadChildren: 'app/pci/manage-service/package-service/package-service.module#PackageServiceModule'
}, {
  path: 'service-spec',
  loadChildren: 'app/pci/manage-service/service-spec/service-spec.module#ServiceSpecModule'
}];
