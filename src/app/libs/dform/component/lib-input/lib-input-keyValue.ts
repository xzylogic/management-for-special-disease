import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormKeyValue } from '../../_entity/form-keyValue';

@Component({
  selector: 'app-input-keyValue',
  template: `
    <div [formGroup]="form">
      <div *ngFor="let i of arr">
        <mat-form-field style="width: 30%; display: inline-block" floatPlaceholder="always">
          <input matInput [placeholder]="data.label"
                 (change)="kChange($event, i)"
          >
        </mat-form-field>
        <mat-form-field style="width: 30%; display: inline-block" floatPlaceholder="always">
          <input matInput (change)="vChange($event, i)"
          >
        </mat-form-field>
      </div>
      <button mat-raised-button color="primary" type="button" (click)="addModel()">点击添加模板参数</button>
      <input type="hidden" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
    </div>
  `
})
export class LibInputKeyValueComponent implements OnInit {
  arr = [0];
  modelKey: any = [];
  modelValue: any = [];
  @Input() form: FormGroup;
  @Input() data: FormKeyValue;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  kChange(vl, i) {
    this.value = this.value || [];
    this.modelKey[i] = vl.target.value;
    this.modelValue[i] = this.modelValue[i] || '';
    this.value[i] = {
      modelKey: vl.target.value,
      modelValue: this.modelValue[i] || '',
    }
  }

  vChange(vl, i) {
    // console.log(i)
    // console.log(this.modelKey)
    // console.log(this.modelValue)
    this.value = this.value || [];
    this.modelValue[i] = vl.target.value;
    this.modelKey[i] = this.modelKey[i] || '';
    // console.log(this.value, typeof this.value)
    this.value[i] = {
      modelKey: this.modelKey[i] || '',
      modelValue: vl.target.value,
    }
    // console.log(this.value)
  }

  change() {
    this.valueChange.emit(this.value);
  }

  addModel() {
    const len = this.arr.length;
    this.arr.push(len);
  }
}
