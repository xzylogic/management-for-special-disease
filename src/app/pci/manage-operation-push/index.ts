import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'operation-push',
  loadChildren: 'app/pci/manage-operation-push/operation-push.module#OperationPushModule'
}];
