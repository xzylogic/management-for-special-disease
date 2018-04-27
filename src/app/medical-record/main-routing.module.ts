import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

import { routes as dataCollectionRoutes } from '../shared/manage-data-collection';

@NgModule({
  imports: [RouterModule.forChild([{
      path: 'login',
      loadChildren: 'app/medical-record/app-login/login.module#LoginModule'
    }, {
      path: '',
      component: MainComponent,
      children: [
        {
          path: '',
          redirectTo: '/data-collection',
          pathMatch: 'full'
        },
        ...dataCollectionRoutes,
      ]
    }]
  )],
  exports: [RouterModule]
})
export class RoutingModule {
}
