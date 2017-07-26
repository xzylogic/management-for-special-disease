import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDropdown } from '../../_entity';

@Component({
  selector: 'app-input-dropdown',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <md-select style="width: 100%" [placeholder]="data.label" [formControlName]="data.key" [(ngModel)]="value" (change)="change()">
          <md-option *ngFor="let opt of data.options" [value]="opt.id">
            {{opt.name}}
          </md-option>
        </md-select>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputDropdownComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormDropdown;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
