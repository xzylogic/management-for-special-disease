import { Component, OnInit, Inject} from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { HealthDataService } from './_service/health-data.service';
import { HealthDataTableService } from './_service/health-data-table.service';
import {
  TableOption, ContainerConfig
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-health-data',
  templateUrl: './health-data.component.html',
  styleUrls: ['./health-data.component.css']
})
export class HealthDataComponent implements OnInit {

  containerConfig: ContainerConfig;
  pressureTable: TableOption;
  sugarTable: TableOption;
  rateTable: TableOption;
  weightTable: TableOption;

  @select(['healthData', 'tab']) tab: Observable<number>;
  @select(['healthData', 'page']) page: Observable<Array<number>>;

  queryBind: any = '';

  constructor(
    @Inject('action') private action,
    private healthDataService: HealthDataService,
    private healthDataTableService: HealthDataTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.healthDataService.UserHealthDataConfig();
    this.pressureTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.sugarTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.rateTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.weightTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset () {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
  }

  reset0() {
    this.queryBind = '';
    this.pressureTable.queryKey = '';
    console.log(this.queryBind);
    this.page.subscribe((page: Array<number>) => {
      this.PressureData(page[0]);
    });
  }

  reset1() {
    this.queryBind = '';
    this.pressureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getSugarData(page[1]);
    });
  }

  reset2() {
    this.queryBind = '';
    this.pressureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getRateData(page[2]);
    });
  }

  reset3() {
    this.queryBind = '';
    this.pressureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getWeightData(page[3]);
    });
  }

  PressureData(page: number) {
    this.action.pageChange('healthData', [page, this.sugarTable.currentPage, this.rateTable.currentPage, this.weightTable.currentPage]);
    this.pressureTable.reset(page);
    this.healthDataService.getData(page, this.pressureTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.pressureTable.loading = false;
          if (res.data && res.data.pressure && res.data.pressure.totalElements === 0 && res.code === 0) {
            this.pressureTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.pressure && res.code === 0) {
            this.pressureTable.totalPage = res.data.pressure.totalPages;
            this.pressureTable.lists = res.data.pressure.content;
          } else {
            this.pressureTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.pressureTable.errorMessage = ERRMSG.nullMsg;
        });
  }

  getSugarData(page: number) {
    this.action.pageChange('healthData', [this.pressureTable.currentPage, page, this.rateTable.currentPage, this.weightTable.currentPage]);
    this.sugarTable.reset(page);
    this.healthDataService.getData(page, this.sugarTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.sugarTable.loading = false;
          if (res.data && res.data.sugar && res.data.sugar.totalElements === 0 && res.code === 0) {
            this.sugarTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.sugar && res.code === 0) {
            this.sugarTable.totalPage = res.data.sugar.totalPages;
            this.sugarTable.lists = res.data.sugar.content;
          } else {
            this.sugarTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.sugarTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getRateData(page: number) {
    this.action.pageChange('healthData', [this.pressureTable.currentPage, this.sugarTable.currentPage, page, this.weightTable.currentPage]);
    this.rateTable.reset(page);
    this.healthDataService.getData(page, this.rateTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.rateTable.loading = false;
          if (res.data && res.data.sugar && res.data.heartRate.totalElements === 0 && res.code === 0) {
            this.rateTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.heartRate && res.code === 0) {
            this.rateTable.totalPage = res.data.sugar.totalPages;
            this.rateTable.lists = res.data.heartRate.content;
          } else {
            this.rateTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.rateTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getWeightData(page: number) {
    this.action.pageChange('healthData', [this.pressureTable.currentPage, this.rateTable.currentPage, this.sugarTable.currentPage, page]);
    this.weightTable.reset(page);
    this.healthDataService.getData(page, this.weightTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.weightTable.loading = false;
          if (res.data && res.data.weight && res.data.weight.totalElements === 0 && res.code === 0) {
            this.weightTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.heartRate && res.code === 0) {
            this.weightTable.totalPage = res.data.weight.totalPages;
            this.weightTable.lists = res.data.weight.content;
          } else {
            this.weightTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.weightTable.loading = false;
          this.weightTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  change(index) {
    this.action.tabChange('healthData', index);
  }

  // //打印excel;
  // printPressure(){
  //   let totalPages: any;
  //   this._userService.getData(0, this.pressureQueryKey, this.pressureQueryBind).map(
  //     data => {
  //       totalPages = data.data.pressure.totalPages;
  //       this.allPressureTable.lists = data.data.pressure.content;
  //     }
  //   ).subscribe(
  //     () => {
  //       for(let page=1;page<totalPages;page++){
  //         this._userService.getData(page, this.pressureQueryKey, this.pressureQueryBind).subscribe(
  //           data => {
  //             this.allPressureTable.lists = this.allPressureTable.lists.concat(data.data.pressure.content);
  //           });
  //           // console.log(page);
  //       }
  //       this.pressureFinish = true;
  //     }
  //   );
  // }
  //
  // printSugar(){
  //   let totalPages: any;
  //   this._userService.getData(0, this.sugarQueryKey, this.sugarQueryBind).map(
  //     data => {
  //       totalPages = data.data.sugar.totalPages;
  //       this.allSugarTable.lists = data.data.sugar.content;
  //     }
  //   ).subscribe(
  //     () => {
  //       for(let page=1;page<totalPages;page++){
  //         this._userService.getData(page, this.sugarQueryKey, this.sugarQueryBind).subscribe(
  //           data => {
  //             this.allSugarTable.lists = this.allSugarTable.lists.concat(data.data.sugar.content);
  //           }
  //         );
  //       }
  //       this.sugarFinish = true;
  //     }
  //   );
  // }
  //
  // printRate(){
  //   let totalPages: any;
  //   this._userService.getData(0, this.rateQueryKey, this.rateQueryBind).map(
  //     data => {
  //       totalPages = data.data.heartRate.totalPages;
  //       this.allRateTable.lists = data.data.heartRate.content;
  //     }
  //   ).subscribe(
  //     () => {
  //       for(let page=1;page<totalPages;page++){
  //         this._userService.getData(page, this.rateQueryKey, this.rateQueryBind).subscribe(
  //           data => {
  //             this.allRateTable.lists = this.allRateTable.lists.concat(data.data.heartRate.content);
  //           }
  //         );
  //       }
  //       this.rateFinish = true;
  //     }
  //   );
  // }
  //
  // printWeight(){
  //   let totalPages: any;
  //   this._userService.getData(0, this.weightQueryKey, this.weightQueryBind).map(
  //     data => {
  //       totalPages = data.data.weight.totalPages;
  //       this.allWeightTable.lists = data.data.weight.content;
  //     }
  //   ).subscribe(
  //     () => {
  //       for(let page=1;page<totalPages;page++){
  //         this._userService.getData(page, this.weightQueryKey, this.weightQueryBind).subscribe(
  //           data => {
  //             this.allWeightTable.lists = this.allWeightTable.lists.concat(data.data.weight.content);
  //           }
  //         );
  //       }
  //       this.weightFinish = true;
  //     }
  //   );
  // }
  //
  // downloadPressure(){
  //   this.printPressure();
  //   var download = setInterval(()=>{
  //     if(this.pressureFinish){//保证打印到表格的异步函数已经完成,应该能保证吧。。
  //       // console.log(this.allPressureTable);
  //       let event = document.createEvent('MouseEvent');
  //       event.initEvent('click',false,false);
  //       document.getElementById('downloadPressure').dispatchEvent(event);
  //       clearInterval(download);
  //       this.pressureFinish = false;
  //     }
  //   },1000);
  // }
  //
  // downloadSugar(){
  //   this.printSugar();
  //   this.sugarExcel();
  //   var download = setInterval(()=>{
  //     if(this.sugarFinish){
  //       // console.log(this.allSugarTable);
  //       let event = document.createEvent('MouseEvent');
  //       event.initEvent('click',false,false);
  //       document.getElementById('downloadSugar').dispatchEvent(event);
  //       clearInterval(download);
  //       this.sugarFinish = false;
  //     }
  //   },1000);
  // }
  //
  // downloadRate(){
  //   this.printRate();
  //   this.rateExcel();
  //   var download = setInterval(()=>{
  //     if(this.rateFinish){
  //       // console.log(this.allRateTable);
  //       let event = document.createEvent('MouseEvent');
  //       event.initEvent('click',false,false);
  //       document.getElementById('downloadRate').dispatchEvent(event);
  //       clearInterval(download);
  //       this.rateFinish = false;
  //     }
  //   },1000);
  // }
  //
  // downloadWeight(){
  //   this.printWeight();
  //   this.weightExcel();
  //   var download = setInterval(()=>{
  //     if(this.weightFinish){
  //       // console.log(this.allWeightTable);
  //       let event = document.createEvent('MouseEvent');
  //       event.initEvent('click',false,false);
  //       document.getElementById('downloadWeight').dispatchEvent(event);
  //       clearInterval(download);
  //       this.weightFinish = false;
  //     }
  //   },1000);
  // }
  //
  // pressureExcel(){
  //   $('.pressureExcel').on('click', function(){
  //       console.log("aa");
  //       let myDate = new Date();
  //       let $this = $(this);
  //       let table = $("#pressure")[0];
  //       $this.attr('download', '全程心管家患者体征数据-血压-'+myDate.toLocaleDateString()+'.xls');
  //       ExcellentExport.excel(this, table);
  //   });
  // }
  //
  // sugarExcel(){
  //   $('.sugarExcel').on('click', function(){
  //       let myDate = new Date();
  //       let $this = $(this);
  //       let table = $("#sugar")[0];
  //       $this.attr('download', '全程心管家患者体征数据-血糖-'+myDate.toLocaleDateString()+'.xls');
  //       ExcellentExport.excel(this, table);
  //   });
  // }
  //
  // rateExcel(){
  //   $('.rateExcel').on('click', function(){
  //       let myDate = new Date();
  //       let $this = $(this);
  //       let table = $("#rate")[0];
  //       $this.attr('download', '全程心管家患者体征数据-心率-'+myDate.toLocaleDateString()+'.xls');
  //       ExcellentExport.excel(this, table);
  //   });
  // }
  //
  // weightExcel(){
  //   $('.weightExcel').on('click', function(){
  //       let myDate = new Date();
  //       let $this = $(this);
  //       let table = $("#weight")[0];
  //       $this.attr('download', '全程心管家患者体征数据-体重-'+myDate.toLocaleDateString()+'.xls');
  //       ExcellentExport.excel(this, table);
  //   });
  // }
}
