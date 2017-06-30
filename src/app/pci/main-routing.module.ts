import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PciMainComponent } from './main.component';

import { routes as doctorRoutes } from './manage-doctor';
import { AuthGuardService } from './_service/auth-guard.service';

@NgModule({
  imports: [RouterModule.forChild([{
      path: '',
      component: PciMainComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: '',
          redirectTo: '/doctor',
          pathMatch: 'full'
        },
        ...doctorRoutes,
      ]
    }]
  )],
  exports: [RouterModule]
})
export class PciRoutingModule {
}
