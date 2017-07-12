import { Component, OnInit } from '@angular/core';

import { TableOption } from '../../../libs';
import { DiscomfortSymptomService } from './_service/discomfort-symptom.service';
import { DiscomfortSymptomTableService } from './_service/discomfort-symptom-table.service';

@Component({
  selector: 'app-discomfort-symptom',
  templateUrl: './discomfort-symptom.component.html'
})
export class DiscomfortSymptomComponent implements OnInit {
  // title = '基础数据维护';
  // subTitle = '不适症状列表';
  // loading = true;

  //  symptom:any;
  //  enableEdit: boolean;
  //
  //  // 展示信息模态框选项
  //  titleShow: string;
  //  message: string;
  //  enableShow: boolean;
  //  errorMessage:string;
  //
  // discomfortSymptomTable1: TableOption = new TableOption();
  //  discomfortSymptomTable2: TableOption = new TableOption();
  //  discomfortSymptomTable3: TableOption = new TableOption();
  //  discomfortSymptomTable4: TableOption = new TableOption();
  //  discomfortSymptomTable5: TableOption = new TableOption();
  //  discomfortTypes: any;
  //
  constructor(
    private discomfortSymptomService: DiscomfortSymptomService,
    private discomfortSymptomTableService: DiscomfortSymptomTableService
  ) {
  }

  //
  ngOnInit() {
    //    this.getDiscomfortSymptomTypes();
    //    this.getDiscomfortSymptomTitles();
    //    this.getDiscomfortSymptoms(1, this.discomfortSymptomTable1);
    //    this.getDiscomfortSymptoms(2, this.discomfortSymptomTable2);
    //    this.getDiscomfortSymptoms(3, this.discomfortSymptomTable3);
    //    this.getDiscomfortSymptoms(4, this.discomfortSymptomTable4);
    //    this.getDiscomfortSymptoms(5, this.discomfortSymptomTable5);
    //  }
    //
    //  getDiscomfortSymptomTypes() {
    //    this._discomfortSymptomService.getDiscomfortSymptomType()
    //      .subscribe(
    //        data => {
    //          if (data.code === 0) {
    //            this.discomfortTypes = data.data;
    //          }
    //        });
  }

  //
  //  getDiscomfortSymptomTitles() {
  //    this.discomfortSymptomTable1.titles = this._discomfortSymptomTableService.setTitles();
  //    this.discomfortSymptomTable2.titles = this._discomfortSymptomTableService.setTitles();
  //    this.discomfortSymptomTable3.titles = this._discomfortSymptomTableService.setTitles();
  //    this.discomfortSymptomTable4.titles = this._discomfortSymptomTableService.setTitles();
  //    this.discomfortSymptomTable5.titles = this._discomfortSymptomTableService.setTitles();
  //  }
  //
  //  getDiscomfortSymptoms(symptomTypeId: number, list: TableOption) {
  //    list.lists = [];
  //    this._discomfortSymptomService.getDiscomfortSymptoms(symptomTypeId)
  //      .subscribe(
  //        data => {
  //          this.discomfortSymptomTable1.loading = false;
  //          if (data.data && data.data.length === 0 && data.code === 0) {
  //            this.discomfortSymptomTable1.errorMessage = "该数据为空哦～";
  //          } else if(data.data && data.code === 0){
  //             for (var i = 0; i < data.data.length; i++) {
  //                 data.data[i].symptomTypeId = symptomTypeId;
  //                 data.data[i].enableName = this.getSymptom(data.data[i].enable);
  //                 list.lists.push(data.data[i]);
  //             }
  //        }
  //      },err =>{
  //        console.log(111);
  //         this.discomfortSymptomTable1.loading = false;
  //         this.discomfortSymptomTable1.errorMessage = "啊哦！接口访问出错啦～";
  //      })
  //  }
  //
  //  //刷新页面
  //  refresh() {
  //    this.getDiscomfortSymptoms(1, this.discomfortSymptomTable1);
  //    this.getDiscomfortSymptoms(2, this.discomfortSymptomTable2);
  //    this.getDiscomfortSymptoms(3, this.discomfortSymptomTable3);
  //    this.getDiscomfortSymptoms(4, this.discomfortSymptomTable4);
  //    this.getDiscomfortSymptoms(5, this.discomfortSymptomTable5);
  //  }
  //
  //  //状态信息转换
  //  getSymptom(statu){
  //    if(statu === true) {
  //      return '启用';
  //    }
  //    if(statu === false) {
  //      return '禁用';
  //    }
  //    return null;
  //  }
  //
  //  gotoHandle(data) {
  //     this.symptom = data;
  //     this.enableEdit = true;
  //  }
  //
  //
  //  //新增不适症状
  //  newDiscomfort(){
  //    this.symptom = null;
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

}
