import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormRadio } from '../../_entity';

@Component({
  selector: 'app-input-radio',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <md-radio-group class="input_content"
                        style="border: none"
                        [formControlName]="data.key"
                        [(ngModel)]="value"
                        (change)="change()">
          <md-radio-button class="check_content"
                           *ngFor="let opt of data.options"
                           [value]="opt.id"
                           [checked]="opt.checked"
          >{{opt.name}}
          </md-radio-button>
        </md-radio-group>
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputRadioComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: FormRadio;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (this.data) {
      this.data.options.forEach(obj => {
        if (obj.id === this.value) {
          obj.checked = true;
        }
      })
    }
  }

  change() {
    this.valueChange.emit(this.value);
  }
}
