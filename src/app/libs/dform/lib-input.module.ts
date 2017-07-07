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
import { LibInputCheckboxComponent } from './component/lib-input/lib-input-checkbox';
import { LibInputDateComponent } from './component/lib-input/lib-input-date';
import { LibInputDatetimeComponent } from './component/lib-input/lib-input-datetime';
import { LibInputDropdownComponent } from './component/lib-input/lib-input-dropdown';
import { LibInputEditorComponent } from './component/lib-input/lib-input-editor';
import { LibInputFileComponent } from './component/lib-input/lib-input-file';
import { LibInputRadioComponent } from './component/lib-input/lib-input-radio';
import { LibInputTimeComponent } from './component/lib-input/lib-input-time';
import { LibInputTextareaComponent } from './component/lib-input/lib-input-textarea';

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
