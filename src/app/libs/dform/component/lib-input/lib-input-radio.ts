import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormRadio } from '../../_entity';

@Component({
  selector: 'app-input-radio',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <md-radio-group class="input_content"
                        [formControlName]="data.key"
                        [(ngModel)]="value">
          <md-radio-button class="check_content"
                           *ngFor="let opt of data.options"
                           [value]="opt.id"
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
  }
}
