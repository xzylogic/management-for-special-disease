import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { ServiceSpecService } from '../_service';

@Component({
  selector: 'app-service-spec-edit',
  templateUrl: 'service-spec-edit.component.html',
  styleUrls: ['service-spec-edit.component.scss']
})
export class ServiceSpecEditComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Output() enableChange: EventEmitter <any> = new EventEmitter();
  @Output() handleEmit: EventEmitter <any> = new EventEmitter();

  modalTitle: string;
  errorMessage: string;

  name: string;
  specificationIdx: string;
  price: string;
  count: string;
  serviceName: string;
  serviceId: number;
  operator: string;
  enabled: boolean; 

  searchStream: Subject<string> = new Subject<string>();
  results$: Array<string>;

  specType = [{
    id: 0,
    name: '第三方服务'
  }, {
    id: 1,
    name: '组合套餐'
  }];

  constructor(private _serviceSpecService: ServiceSpecService) {}

  ngOnInit() {
    if(this.data) {
      this.name = this.data.name;
      this.specificationIdx = this.data.specificationIdx;
      this.price = this.data.price;
      this.count = this.data.count;
      this.serviceName = this.data.serviceName;
      this.serviceId = this.data.serviceId;
      this.operator = this.data.operator;
      this.enabled = this.data.enable;
    }
    
    this.searchStream
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchText => {
        this.loadData(this.serviceName);
      });
  }

  ngAfterViewInit() {
    // $('#enable').dropdown();
    // $('#specType').dropdown();
  }

  //提交保存信息
  getValue(data) {
    delete data.serviceName;
    if (this.data) {
      data.id = this.data.id;
    }
    // console.log(data);
    this._serviceSpecService.serviceSpecUpdate(data)
      .subscribe(
      data => {
        if (data.code === 0) {
          this.handleEmit.emit("保存成功！");
          this.close();
        } else {
          if (data.msg) {
            this.errorMessage = data.msg;
          } else {
            this.errorMessage = "操作失败！";
          }
        }
      }, err => {
        this.errorMessage = "啊哦！访问出错啦～";
      });
  }

  search($event) {
    // this.serviceId = null;
    this.searchStream.next(this.serviceName);
  }

  loadData(key) {
    if(key) {
      this._serviceSpecService.searchThird(key)
        .subscribe(res => {
          if(res.code === 0 && res.data && res.data.length !== 0) {
            this.results$ = res.data;
          }
        });
    }
  }

  selected(data) {
    this.serviceName = data.name;
    this.serviceId = data.id;
    this.results$ = [];
  }

  //关闭模态框
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}