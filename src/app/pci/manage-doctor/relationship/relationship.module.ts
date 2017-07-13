import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RelationshipComponent } from './relationship.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { RelationshipService } from './_service/relationship.service';
import { RelationshipTableService } from './_service/relationship-table.service';

const routes: Routes = [{
  path: '',
  component: RelationshipComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    RelationshipComponent
  ],
  providers: [
    RelationshipService,
    RelationshipTableService
  ]
})
export class RelationshipModule {
}
