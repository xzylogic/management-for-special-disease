import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { DrugService } from './_service/drug.service';
import { DrugTableService } from './_service/drug-table.service';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html'
})
export class DrugComponent implements OnInit {

  constructor(
    private _drugService: DrugService,
    private _drugTableService: DrugTableService
  ) {
  }

  ngOnInit() {
    // this.getDrugTitles();
    // this.getDrugs(0);
  }

  // getDrugTitles() {
  //   this.drugTable.titles = this._drugTableService.setTitles();
  // }
  //
  // getDrugs(page: number) {
  //   this.drugTable.currentPage = page;
  //   this._drugService.getDrugs(page, this.drugTable.size)
  //     .subscribe(
  //       data => {
  //         this.drugTable.loading = false;
  //         if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
  //           this.drugTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.data.content && data.code === 0) {
  //            this.drugTable.totalPage = data.data.totalPages;
  //           this.drugTable.lists = data.data.content;
  //           for (let i = 0; i < this.drugTable.lists.length;i++) {
  //             this.drugTable.lists[i].enableName = this.getDrug(this.drugTable.lists[i].enable);
  //           }
  //         } else {
  //           this.drugTable.errorMessage = "空空如也～";
  //         }
  //       },err =>{
  //         this.drugTable.loading = false;
  //         this.drugTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
  // //刷新页面
  // refresh() {
  //   this.getDrugs(0);
  // }
  // //编辑药品数据
  // gotoHandle(data) {
  //   this.drug = data;
  //   this.enableEdit = true;
  // }
  // // 新增药品
  // newDrug(){
  //   this.drug = null;
  //   this.enableEdit = true;
  // }
  // //状态信息转换
  // getDrug(statu){
  //   if(statu === true) {
  //     return '启用';
  //   }
  //   if(statu === false) {
  //     return '禁用';
  //   }
  //   return null;
  // }
  //
  //
  // //返回服务器信息
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
