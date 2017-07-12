import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableOption } from '../../entities';

import { CommodityService, CommodityTableService } from './_service';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html'
})
export class CommodityComponent implements OnInit {
  title = '商品维护';
  subTitle = '商品列表';

  commodityTable: TableOption = new TableOption();

  commodity: any;
  enableEdit: boolean;

  message: string;
  enableShow: boolean;

  status: number;

  delData: any;

  enableOperate: boolean;

  constructor(
    private _commodityService: CommodityService,
    private _commodityTableService: CommodityTableService
  ) {}

  ngOnInit() {
    this.getCommodityTitles();
    this.getCommodities();
  }

  getCommodityTitles() {
    this.commodityTable.titles = this._commodityTableService.setTitles();
  }

  refresh(){
    this.getCommodities();
  }

  getCommodities() {
    this._commodityService.getCommodities()
      .subscribe(
        data => {
          this.commodityTable.loading = false;
          if (data.data && data.data.length === 0 && data.code === 0) {
            this.commodityTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.code === 0) {
            this.formatCommodity(data.data);
            this.commodityTable.lists = data.data;
            // console.log(data.data);
          } else {
            this.commodityTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.commodityTable.loading = false;
          this.commodityTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  gotoHandle(data) {
    if (data.key == 'edit') {
      this.commodity = data.value;
      this.enableEdit = true;
    }
    if (data.key == 'updown') {
      this.delData = data.value;
      this.enableOperate = true;
      if(data.value.status){
        this.message = "确定上架该数据？";
        this.status = 0;
        data.value.updown = '上架';
      }else{
        this.message = "确定下架该数据？";
        this.status = 1;
        data.value.updown = '下架';
      }
    }
    if (data.key == 'del'){
      this.delData = data.value;
      this.enableOperate = true;
      this.message = "确定删除该数据？";
      this.status == 2;
    }
  }

  formatCommodity(list: Array < any > ) {

    list.forEach(data => {
      data.typeName = data.type ? '现金兑换' : '商品兑换';
      data.statusName = data.status ? '下架' : '上架';
      data.updown = data.status ? '上架' : '下架';
      data.createUserName = data.createUser && data.createUser.name || '';

      data.pictures = [];
      if (data.pictureList) {
        data.pictureList.forEach(picture => {
          data.pictures.push(picture.url);
        });
      }
    });
  }

  newCommodity(){
    this.commodity = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getCommodities();
  }

  operate() {
    if(this.status !== 0 && this.status !== 1){
      this.status = 2;
    }
    this._commodityService.commodityStatus(this.delData.id, this.status)
      .catch(
        err => {
          this.delOperate();
          this.message = "操作失败";
          this.enableShow = true;
          return Observable.throw(err);
        })
      .subscribe(
        data => {
          if (data.code === 0) {
            this.delOperate();
            this.message = "操作成功";
            this.status = null;
            this.enableShow = true;
            this.getCommodities();
          } else {
            this.delOperate();
            if (data.msg) {
              this.message = data.msg;
            } else {
              this.message = "操作失败";
            }
            this.enableShow = true;
          }
        })
  }

  delOperate() {
    this.delData = null;
    this.enableOperate = false;
  }
}
