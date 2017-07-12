import { NgModule } from '@angular/core';

import { DynamicFormComponent, DynamicFormSetComponent } from './component';
import { DFormControlService } from './_service';
import { LibInputModule } from './lib-input.module';

@NgModule({
  imports: [
    LibInputModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormSetComponent
  ],
  providers: [
    DFormControlService
  ],
  exports: [
    LibInputModule,
    DynamicFormComponent,
    DynamicFormSetComponent
  ]
})
export class DFormModule {
}
