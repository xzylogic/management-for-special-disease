import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdIconModule } from '@angular/material';

import { ContainerComponent } from './container';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    RouterModule
  ],
  declarations: [
    ContainerComponent
  ],
  exports: [
    MdIconModule,
    ContainerComponent
  ]
})
export class LibModule {
}
