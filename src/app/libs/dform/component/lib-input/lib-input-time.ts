import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormText } from '../../_entity';

declare var require;
const Flatpickr = require('flatpickr');

@Component({
  selector: 'app-input-time',
  template: `
    <div [formGroup]="form">
      <div class="input_container">
        <input class="input_content" 
               [placeholder]="data.placeholder" 
               [formControlName]="data.key" 
               [(ngModel)]="value" #time
        >
        <span class="input_span">{{data.label}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./lib-input.scss']
})
export class LibInputTimeComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() data: FormText;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('time') time: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const date = new Flatpickr(this.time.nativeElement, {
      'enableTime': true,
      'time_24hr': true,
      'noCalendar': true,
      'defaultDate': this.value || ''
    });
  }
}
