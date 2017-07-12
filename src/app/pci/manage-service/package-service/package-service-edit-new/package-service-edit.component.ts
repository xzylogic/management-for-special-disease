import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { PackageServiceService } from '../_service';
import { ServiceSpecService } from '../../service-spec/_service';
import { CommonService } from "../../../_services/common.service";

@Component({
  selector: 'package-service-edit-new',
  templateUrl: 'package-service-edit.component.html',
  styleUrls: ['package-service-edit.component.scss']
})
export class PackageServiceEditNewComponent implements OnInit {
  @Input() data: any;
  @Input() enable: boolean;
  @Input() DoctorServiceList: any;
  @Input() HealthServiceList: any;
  @Output() enableChange: EventEmitter <any> = new EventEmitter();
  @Output() handleEmit: EventEmitter <any> = new EventEmitter();

  modalTitle: string;
  errorMessage: string;

  // 展示信息模态框选项
  enableShow: boolean = false;
  title: string = "提示信息";
  message: string;


  name: string;
  iconUrl: string;
  doctorPackageId: string;
  specifications: any[] = [];
  specificationIds: any[];
  price: string;
  description: string;
  serviceName: string;
  operator: string;
  enabled: boolean;

  searchStream: Subject<string> = new Subject<string>();
  results$: Array<string>;

  constructor(
    private _packageServiceService: PackageServiceService,
    private _serviceSpecService: ServiceSpecService,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    if(this.data&&this.data.value) {
      // console.log(this.data.value);
      this.name = this.data.value.name;
      this.iconUrl = this.data.value.iconUrl;
      this.doctorPackageId = this.data.value.packageId && this.data.value.packageId.toString();
      this.price = this.data.value.price;
      this.operator = this.data.value.operator;
      this.description = this.data.value.description;
      this.enabled = this.data.value.enable;
      let specs = [];
      this.data.value.thirdServiceIds.forEach(obj => specs.push({ id: obj }));
      this.data.value.thirdServiceList.split(',').forEach((obj, i) => specs[i].name = obj);
      this.specifications = specs;
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
    if (this.data && this.data.value) {
      data.combinatorialId = this.data.value.id;
    }
    data.specificationIds = [];
    this.specifications.forEach(obj => {
      data.specificationIds.push(obj.id);
    });
    // console.log(data);
    this._packageServiceService.packageServiceSave(data)
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
    this.searchStream.next(this.serviceName);
  }

  loadData(key) {
    if(key) {
      this._serviceSpecService.searchSpecName(key)
        .subscribe(res => {
          if(res.code === 0 && res.data && res.data.length !== 0) {
            this.results$ = res.data;
          }
        });
    }
  }

  selected(data) {
    this.specifications.push(data);
    this.results$ = [];
  }

  specDel(i){
    this.specifications.splice(i, 1);
  }

  uploadChange(files) {
    let myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    this._commonService.uploadFile(myForm, this);
  }


  UploadSuccess(data) {
    if (data.code === 0) {
      this.message = "上传图片成功！";
      this.enableShow = true;
      this.iconUrl = data.data;
    } else {
      this.message = "上传图片失败！";
      this.enableShow = true;
    }
  }


  UploadFailure(data) {
    this.message = "上传图片失败！";
    this.enableShow = true;
  }

  fileDel() {
    this.iconUrl = '';
  }

  //关闭模态框
  close() {
    this.enable = !this.enable;
    this.enableChange.emit(this.enable);
  }

}
