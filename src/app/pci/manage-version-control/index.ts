import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'version-control',
  loadChildren: 'app/pci/manage-version-control/version-control.module#VersionControlModule'
}];
