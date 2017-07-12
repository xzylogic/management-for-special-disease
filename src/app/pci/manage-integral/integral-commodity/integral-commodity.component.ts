import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableOption } from '../../../entities';

import { IntegralCommodityService, IntegralCommodityTableService } from './_service';

@Component({
  selector: 'integral-commodity',
  templateUrl: './integral-commodity.component.html'
})
export class IntegralCommodityComponent implements OnInit {
  title = '积分管理';
  subTitle = '积分商品维护';

  integralCommodityTable: TableOption = new TableOption();

  integralCommodity: any;
  enableEdit: boolean;

  message: string;
  enableShow: boolean;

  statusIdx: number;

  delData: any;

  enableOperate: boolean;

  constructor(
    private _integralCommodityService: IntegralCommodityService,
    private _integralCommodityTableService: IntegralCommodityTableService
  ) {}

  ngOnInit() {
    this.getIntegralCommodityTitles();
    this.getIntegralCommodity(0);
  }

  getIntegralCommodityTitles() {
    this.integralCommodityTable.titles = this._integralCommodityTableService.setTitles();
  }

  refresh(){
    this.getIntegralCommodity(0);
  }

  getIntegralCommodity(flag: number) {
    this.integralCommodityTable.currentPage = flag;
    this._integralCommodityService.getIntegralCommodity(flag)
      .subscribe(
        data => {
          this.integralCommodityTable.loading = false;
          // console.log(data.data);
          if (data.data && data.data.content && data.data.length === 0 && data.code === 0) {
            this.integralCommodityTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.formatCommodity(data.data.content);
            this.integralCommodityTable.lists = data.data.content;
            this.integralCommodityTable.totalPage = data.data.totalPages;
            // console.log(data.data.content);
          } else {
            this.integralCommodityTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.integralCommodityTable.loading = false;
          this.integralCommodityTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  gotoHandle(data) {
    if (data.key == 'edit') {
      this.integralCommodity = data.value;
      // console.log(this.commodity);
      this.enableEdit = true;
    }
    if (data.key == 'updown') {
      this.delData = data.value;
      this.enableOperate = true;
      if(data.value.goodsStatus){
        this.message = "确定上架该数据？";
        this.statusIdx = 0;
        data.value.updown = '上架';
      }else{
        this.message = "确定下架该数据？";
        this.statusIdx = 1;
        data.value.updown = '下架';
      }
    }
    if (data.key == 'del'){
      this.delData = data.value;
      this.enableOperate = true;
      this.message = "确定删除该数据？";
      this.statusIdx == 2;
    }
  }

  formatCommodity(list: Array < any > ) {
    list.forEach(data => {
      data.goodsStatusName = data.goodsStatus ? '下架' : '上架';
      data.updown = data.goodsStatus ? '上架' : '下架';
      if(data.goodsType == 0){
        data.goodsTypeName = '客户端';
      }else if(data.goodsType == 1){
        data.goodsTypeName = '医生端';
      }else if(data.goodsType == 2){
        data.goodsTypeName = '全部';
      }
    });
  }

  newIntegralCommodity(){
    this.integralCommodity = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getIntegralCommodity(0);
  }

  operate() {
    // console.log(this.delData);
    if(this.statusIdx !== 0 && this.statusIdx !== 1){
      this.statusIdx = 2;
    }
    this._integralCommodityService.updateIntegralStatus(this.delData.id, this.statusIdx)
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
            this.statusIdx = null;
            this.enableShow = true;
            this.getIntegralCommodity(0);
          } else {
            this.delOperate();
            
            if (data.msg) {
              this.message = data.msg;
            } else {
               console.log(this.delData.id);
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
