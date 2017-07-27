import { Component, Inject, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { DrugService } from './_service/drug.service';
import { DrugTableService } from './_service/drug-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Drug } from './_entity/drug.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html'
})
export class DrugComponent implements OnInit {
  containerConfig: ContainerConfig;
  drugTable: TableOption;
  @select(['drug', 'tab']) tab: Observable<number>;
  @select(['drug', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private drugService: DrugService,
    private drugTableService: DrugTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('drugService', new Drug());
  }

  ngOnInit() {
    this.containerConfig = this.drugService.drugConfig();
    this.drugTable = new TableOption({
      titles: this.drugTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getDrug(page[0]);
    });
  }

  getDrug(page: number) {
    // this.drugTable.reset(page);
    this.drugService.getDrugs(page, 20)
      .subscribe(res => {
        this.drugTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.drugTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.drugTable.totalPage = res.data.totalPages;
          this.drugTable.lists = res.data.content;
          for (let i = 0; i < this.drugTable.lists.length; i++) {
            this.drugTable.lists[i].enableName = this.formatDrug(this.drugTable.lists[i].enable);
          }
        } else {
          this.drugTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.drugTable.loading = false;
        console.log(err);
        this.drugTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('drug', new Drug());
    this.router.navigate(['/drug/edit']);
  }

  gotoHandle(res) {
    const drug = <Drug>res.value;
    if (res.key === 'editDrug') {
      this.action.dataChange('drug', drug);
      this.router.navigate(['/drug/edit']);
    }
  }

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
  //状态信息转换
  formatDrug(statu) {
    if (statu === true) {
      return '启用';
    }
    if (statu === false) {
      return '禁用';
    }
    return null;
  }

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
