import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-risk-detail',
  template: `
    <h1>app-risk-detail</h1>
  `,
})
export class RiskDetailComponent implements OnInit {
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();
  //
  // modalTitle: string;
  // name: string;
  // year: number;
  // result: string;
  // level: string;
  // sex: string;
  // age: string;
  // smoke: boolean;
  // systolic: string;
  // cure: boolean;
  // hdl: string;
  // tc: string;

  constructor() {
  }

  ngOnInit() {
    //   this.modalTitle = this.data.name + "-风险评估结果";
    //
    //   var date = new Date(this.data.date);
    //
    //   this.year = date.getFullYear();
    //   this.result = this.data.result;
    //   this.level = this.data.level;
    //   this.sex = this.data.sex;
    //   this.age = this.data.age;
    //   this.smoke = this.data.smoke;
    //   this.systolic = this.data.systolic;
    //   this.cure = this.data.cure;
    //   this.hdl = this.data.hdl;
    //   this.tc = this.data.tc;
  }

  //
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
