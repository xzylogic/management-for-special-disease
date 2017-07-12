import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FlowerGradeService } from './_service/flower-grade.service';
import { FlowerGradeTableService } from './_service/flower-grade-table.service';

@Component({
  selector: 'app-flower-grade',
  templateUrl: './flower-grade.component.html'
})
export class FlowerGradeComponent implements OnInit {

  // flowerGradeTable: TableOption = new TableOption();

  constructor(
    private _flowerGradeService: FlowerGradeService,
    private _flowerGradeTableService: FlowerGradeTableService
  ) {
  }

  ngOnInit() {
    // this.getFlowerGradeTitles();
    // this.getFlowerGrades();
  }

  //  getFlowerGradeTitles() {
  //    this.flowerGradeTable.titles = this._flowerGradeTableService.setTitles();
  //  }
  //
  //  getFlowerGrades() {
  //    this._flowerGradeService.getFlowerGrades()
  //      .subscribe(
  //        data => {
  //          this.flowerGradeTable.loading = false;
  //          if (data.data && data.data.length === 0 && data.code === 0) {
  //            this.flowerGradeTable.errorMessage = "该数据为空哦～";
  //          } else if (data.data && data.code === 0) {
  //            this.flowerGradeTable.lists = data.data;
  //          } else {
  //            this.flowerGradeTable.errorMessage = "空空如也～";
  //          }
  //        },err =>{
  //          this.flowerGradeTable.loading = false;
  //          this.flowerGradeTable.errorMessage = "啊哦！接口访问出错啦～";
  //        })
  //  }
  //
  //  //刷新页面
  //  refresh() {
  //    this.getFlowerGrades();
  //  }
  //
  //   //编辑鲜花数据
  //  gotoHandle(data) {
  //    if(data.key === "edit"){
  //       this.flower = data;
  //       this.enableEdit = true;
  //    }else if(data.key === "del"){
  //      this.processData = data;
  //      this.processMessage = '你确定要删除？';
  //      this.enableProcess = true;
  //    }
  //
  //  }
  //
  //  // 新增鲜花数据
  //  newFlowerGrade(){
  //    this.flower = null;
  //    this.enableEdit = true;
  //  }
  //
  //
  // //返回服务器信息
  //  handleSuccess(data){
  //    this.titleShow = '提示信息';
  //    this.message = data;
  //    this.enableShow = true;
  //    this.refresh();
  //  }
  //
  //  //确定删除
  //  process(){
  //    this._flowerGradeService.flowerGradeDelete(this.processData.value.id)
  //    .subscribe(
  //          data => {
  //            this.enableProcess = false;
  //            if (data.code === 0) {
  //              this.titleShow = "提示信息"
  //              this.message = "删除成功";
  //              this.enableShow = true;
  //              this.refresh();
  //            } else {
  //              this.titleShow = "提示信息"
  //              this.message = "操作失败";
  //              this.enableShow = true;
  //            }
  //          }, err => {
  //            this.enableProcess = false;
  //            this.titleShow = "提示信息"
  //            this.message = "啊哦！访问出错啦～";
  //            this.enableShow = true;
  //          })
  //  }
  //
  //  //取消删除
  //  processCancel() {
  //    this.processData = null;
  //    this.processMessage = '';
  //    this.enableProcess = false;
  //  }
}
