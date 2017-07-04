import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export class InputTextEntity {
  type: string;
  label: string;
  controlName: string;
  maxlength?: number;
}

@Component({
  selector: 'app-input-text',
  template: `
    <div [formGroup]="form">
      <md-input-container *ngIf="!data.maxlength" style="width: 100%">
        <input mdInput type="{{data.type}}"
               placeholder="{{data.label}}"
               [formControlName]="data.controlName" [(ngModel)]="value">
        <!--<md-error>{{data.label}} is required!</md-error>-->
      </md-input-container>
      <md-input-container *ngIf="data.maxlength">
        <input mdInput type="{{data.type}}" maxlength="{{data.maxlength}}"
               placeholder="{{data.label}}"
               [formControlName]="data.controlName" [(ngModel)]="value">
        <md-hint align="end">{{value.length}} / {{data.maxlength}}</md-hint>
      </md-input-container>
    </div>
  `
})
export class LibInputTextComponent {
  @Input() form: FormGroup;
  @Input() data: InputTextEntity;
  @Input() value = '';
  @Output() valueChange: EventEmitter<string>;
}
