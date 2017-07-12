import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'version-control',
    loadChildren: 'app/container/group-version-control/version-control.module#VersionControlModule'
  }
];