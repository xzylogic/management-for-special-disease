import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PciMainComponent } from './main.component';

import { routes as adRoutes } from './manage-ad';
import { routes as basicDataRoutes } from './manage-basic-data';
import { routes as commodityRoutes } from './manage-commodity';
import { routes as dataCollectionRoutes } from '../shared/manage-data-collection';
import { routes as doctorRoutes } from './manage-doctor';
import { routes as doctorPersonalRoutes } from './manage-doctor-personal';
import { routes as healthNewsRoutes } from './manage-health-news';
import { routes as integralRoutes } from './manage-integral';
import { routes as operationPushRoutes } from './manage-operation-push';
import { routes as serviceRoutes } from './manage-service';
import { routes as statisticsRoutes } from './manage-statistics';
import { routes as userRoutes } from './manage-user';
import { routes as versionControlRoutes } from './manage-version-control';
import { routes as wechatRoutes } from './manage-wechat';

@NgModule({
  imports: [RouterModule.forChild([{
      path: '',
      component: PciMainComponent,
      children: [
        {
          path: '',
          redirectTo: '/doctor',
          pathMatch: 'full'
        },
        ...adRoutes,
        ...basicDataRoutes,
        ...commodityRoutes,
        ...dataCollectionRoutes,
        ...doctorRoutes,
        ...doctorPersonalRoutes,
        ...healthNewsRoutes,
        ...integralRoutes,
        ...operationPushRoutes,
        ...serviceRoutes,
        ...statisticsRoutes,
        ...userRoutes,
        ...versionControlRoutes,
        ...wechatRoutes,
      ]
    }]
  )],
  exports: [RouterModule]
})
export class PciRoutingModule {
}
