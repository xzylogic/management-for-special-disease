import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule, MdIconModule,
  MdInputModule, MdRadioModule,
  MdCheckboxModule, MdSelectModule,
  MdGridListModule
} from '@angular/material';
import { QuillEditorModule } from 'ngx-quill-editor';

import { 
  LibInputTextComponent, LibInputCheckboxComponent,
  LibInputDateComponent, LibInputDatetimeComponent,
  LibInputDropdownComponent, LibInputEditorComponent,
  LibInputFileComponent, LibInputRadioComponent,
  LibInputTimeComponent, LibInputTextareaComponent
} from './component';
import { HttpService } from '../_service/http.service';
import { DFormControlService } from './_service/form-control.service';

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
    QuillEditorModule
  ],
  declarations: [
    LibInputTextComponent,
    LibInputCheckboxComponent,
    LibInputDateComponent,
    LibInputDatetimeComponent,
    LibInputDropdownComponent,
    LibInputEditorComponent,
    LibInputFileComponent,
    LibInputRadioComponent,
    LibInputTimeComponent,
    LibInputTextareaComponent
  ],
  providers: [
    DFormControlService,
    HttpService
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
    QuillEditorModule,
    LibInputTextComponent,
    LibInputCheckboxComponent,
    LibInputDateComponent,
    LibInputDatetimeComponent,
    LibInputDropdownComponent,
    LibInputEditorComponent,
    LibInputFileComponent,
    LibInputRadioComponent,
    LibInputTimeComponent,
    LibInputTextareaComponent
  ]
})
export class LibInputModule {
}
