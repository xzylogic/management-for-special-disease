import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MdButtonModule, MdIconModule,
  MdInputModule, MdRadioModule,
  MdCheckboxModule, MdSelectModule,
  MdGridListModule
} from '@angular/material';

import { DFormControlService, UploadService } from './_service';
import { LibInputTextComponent } from './component/lib-input/lib-input-text';

export * from './_entity';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdRadioModule,
    MdCheckboxModule,
    MdSelectModule,
    MdGridListModule
  ],
  declarations: [
    LibInputTextComponent
  ],
  providers: [
    DFormControlService,
    UploadService
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdRadioModule,
    MdCheckboxModule,
    MdSelectModule,
    LibInputTextComponent
  ]
})
export class LibInputModule {
}
