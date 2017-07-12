import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DynamicTableModule } from '../../../shared';

import { RelationshipService, RelationshipTableService } from './_service';

import { RelationshipComponent } from './relationship.component';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RelationshipComponent
      }
    ]),
    DynamicTableModule
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