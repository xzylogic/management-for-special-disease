import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdDialogModule, MdButtonModule, MdInputModule } from '@angular/material';

import { DialogComponent } from './dialog.component';
import { DialogImgComponent } from './dialog-img.component';

export * from './dialog.entity';
export * from './dialog.component';
export * from './dialog-img.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule
  ],
  declarations: [
    DialogComponent,
    DialogImgComponent
  ],
  entryComponents: [
    DialogComponent,
    DialogImgComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MdDialogModule,
    MdButtonModule,
    MdInputModule,
    DialogComponent,
    DialogImgComponent
  ]
})
export class LibDialogModule {
}
