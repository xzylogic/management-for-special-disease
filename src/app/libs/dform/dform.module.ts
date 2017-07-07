import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MdButtonModule, MdIconModule,
  MdInputModule, MdRadioModule,
  MdCheckboxModule, MdSelectModule,
  MdGridListModule
} from '@angular/material';

import { DynamicForm, DynamicFormSet } from './component';
import { DFormControlService, UploadService } from './_service';
import { LibInputTextComponent } from './component/lib-input/lib-input-text';
import { LibInputModule } from './lib-input.module';

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
    MdGridListModule,
    LibInputModule
  ],
  declarations: [
    DynamicForm,
    DynamicFormSet,
    // LibInputTextComponent
  ],
  providers: [
    DFormControlService,
    UploadService
  ],
  exports: [
    CommonModule,
    DynamicForm,
    DynamicFormSet,
    ReactiveFormsModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdRadioModule,
    MdCheckboxModule,
    MdSelectModule,
    // LibInputTextComponent
  ]
})
export class DFormModule {
}
