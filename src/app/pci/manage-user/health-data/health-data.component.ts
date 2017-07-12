import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableOption } from '../../../entities';

import { HealthDataService, HealthDataTableService } from './_service';

declare var $: any;
declare var ExcellentExport:any;

@Component({
  selector: 'app-health-data',
  templateUrl: './health-data.component.html',
  styleUrls: ['./health-data.component.css']
})
export class HealthDataComponent implements OnInit, AfterViewInit {

  title = '患者管理';
  subTitle = '患者体征数据管理';

  pressureTable: TableOption = new TableOption;
  sugarTable: TableOption = new TableOption;
  rateTable: TableOption = new TableOption;
  weightTable: TableOption = new TableOption;

  //把分页的数据拼起来导出全部用
  allPressureTable: TableOption = new TableOption;
  allSugarTable: TableOption = new TableOption;
  allRateTable: TableOption = new TableOption;
  allWeightTable: TableOption = new TableOption;

  pressureQueryKey: string = '';
  pressureQueryBind: string = '';
  sugarQueryKey: string = '';
  sugarQueryBind: string = '';
  rateQueryKey: string = '';
  rateQueryBind: string = '';
  weightQueryKey: string = '';
  weightQueryBind: string = '';
 
  pressureFinish: boolean = false;
  sugarFinish: boolean = false;
  rateFinish: boolean = false;
  weightFinish: boolean = false;

  constructor(
    private _userService: HealthDataService,
    private _userTableService: HealthDataTableService
  ) {}

  ngOnInit() {
    this.setTitles();
    this.getPressureData(0);
    this.getSugarData(0);
    this.getRateData(0);
    this.getWeightData(0);

    //初始化各个excel输出的jquery函数，此举为保证点击后jquery函数有效，只需初始化一次
    this.pressureExcel();
    this.sugarExcel();
    this.rateExcel();
    this.weightExcel();
  }

  ngAfterViewInit() {
    $('#list_pressure').dropdown();
    $('#list_rate').dropdown();
    $('#list_sugar').dropdown();
    $('#list_weight').dropdown();
  }

  setTitles() {
    this.pressureTable.titles = this._userTableService.setTitles();
    this.sugarTable.titles = this._userTableService.setTitles();
    this.rateTable.titles = this._userTableService.setTitles();
    this.weightTable.titles = this._userTableService.setTitles();
  }

  clearPressure() {
    this.pressureQueryKey = '';
    this.pressureQueryBind = '';
    $('.text').text('筛选状态');
    $('.text').addClass('default');
    this.getPressureData(0);
  }

  clearSugar() {
    this.sugarQueryKey = '';
    this.sugarQueryBind = '';
    $('.text').text('筛选状态');
    $('.text').addClass('default');
    this.getSugarData(0);
  }

  clearRate() {
    this.rateQueryKey = '';
    this.rateQueryBind = '';
    $('.text').text('筛选状态');
    $('.text').addClass('default');
    this.getRateData(0);
  }

  clearWeight() {
    this.weightQueryKey = '';
    this.weightQueryBind = '';
    $('.text').text('筛选状态');
    $('.text').addClass('default');
    this.getWeightData(0);
  }

  refresh(){
    $('.text').text('筛选状态');
    $('.text').addClass('default');
    this.getPressureData(0);
    this.getSugarData(0);
    this.getRateData(0);
    this.getWeightData(0);
  }

  getPressureData(page: number) {
    this.pressureTable.lists = null;
    this.pressureTable.loading = true;
    this.pressureTable.errorMessage = '';
    this.pressureTable.currentPage = page;
    this._userService.getData(page, this.pressureQueryKey, this.pressureQueryBind)
      .subscribe(
        data => {
          this.pressureTable.loading = false;
          if (data.data && data.data.pressure && data.data.pressure.totalElements === 0 && data.code === 0) {
            this.pressureTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.pressure && data.code === 0) {
            this.pressureTable.totalPage = data.data.pressure.totalPages;
            this.pressureTable.lists = data.data.pressure.content;
          } else {
            this.pressureTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.pressureTable.loading = false;
          this.pressureTable.errorMessage = "啊哦！接口访问出错啦～";
        });
  }

  getSugarData(page: number) {
    this.sugarTable.lists = null;
    this.sugarTable.loading = true;
    this.sugarTable.errorMessage = '';
    this.sugarTable.currentPage = page;
    this._userService.getData(page, this.sugarQueryKey, this.sugarQueryBind)
      .subscribe(
        data => {
          this.sugarTable.loading = false;
          if (data.data && data.data.sugar && data.data.sugar.totalElements === 0 && data.code === 0) {
            this.sugarTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.sugar && data.code === 0) {
            this.sugarTable.totalPage = data.data.sugar.totalPages;
            this.sugarTable.lists = data.data.sugar.content;
          } else {
            this.sugarTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.sugarTable.loading = false;
          this.sugarTable.errorMessage = "啊哦！接口访问出错啦～";
        });
  }

  getRateData(page: number) {
    this.rateTable.lists = null;
    this.rateTable.loading = true;
    this.rateTable.errorMessage = '';
    this.rateTable.currentPage = page;
    this._userService.getData(page, this.rateQueryKey, this.rateQueryBind)
      .subscribe(
        data => {
          this.rateTable.loading = false;
          if (data.data && data.data.sugar && data.data.heartRate.totalElements === 0 && data.code === 0) {
            this.rateTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.heartRate && data.code === 0) {
            this.rateTable.totalPage = data.data.sugar.totalPages;
            this.rateTable.lists = data.data.heartRate.content;
          } else {
            this.rateTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.rateTable.loading = false;
          this.rateTable.errorMessage = "啊哦！接口访问出错啦～";
        });
  }

  getWeightData(page: number) {
    this.weightTable.lists = null;
    this.weightTable.loading = true;
    this.weightTable.errorMessage = '';
    this.weightTable.currentPage = page;
    this._userService.getData(page, this.weightQueryKey, this.weightQueryBind)
      .subscribe(
        data => {
          this.weightTable.loading = false;
          if (data.data && data.data.weight && data.data.weight.totalElements === 0 && data.code === 0) {
            this.weightTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.heartRate && data.code === 0) {
            this.weightTable.totalPage = data.data.weight.totalPages;
            this.weightTable.lists = data.data.weight.content;
          } else {
            this.weightTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.weightTable.loading = false;
          this.weightTable.errorMessage = "啊哦！接口访问出错啦～";
        });
  }
  
  //打印excel;
  printPressure(){
    let totalPages: any;
    this._userService.getData(0, this.pressureQueryKey, this.pressureQueryBind).map(
      data => {
        totalPages = data.data.pressure.totalPages;
        this.allPressureTable.lists = data.data.pressure.content;
      }
    ).subscribe(
      () => {
        for(let page=1;page<totalPages;page++){
          this._userService.getData(page, this.pressureQueryKey, this.pressureQueryBind).subscribe(
            data => {
              this.allPressureTable.lists = this.allPressureTable.lists.concat(data.data.pressure.content);
            });
            // console.log(page);
        }
        this.pressureFinish = true;
      }
    );
  }

  printSugar(){
    let totalPages: any;
    this._userService.getData(0, this.sugarQueryKey, this.sugarQueryBind).map(
      data => {
        totalPages = data.data.sugar.totalPages;
        this.allSugarTable.lists = data.data.sugar.content;
      }
    ).subscribe(
      () => {
        for(let page=1;page<totalPages;page++){
          this._userService.getData(page, this.sugarQueryKey, this.sugarQueryBind).subscribe(
            data => {
              this.allSugarTable.lists = this.allSugarTable.lists.concat(data.data.sugar.content);
            }
          );
        }
        this.sugarFinish = true;
      }
    );
  }

  printRate(){
    let totalPages: any;
    this._userService.getData(0, this.rateQueryKey, this.rateQueryBind).map(
      data => {
        totalPages = data.data.heartRate.totalPages;
        this.allRateTable.lists = data.data.heartRate.content;
      }
    ).subscribe(
      () => {
        for(let page=1;page<totalPages;page++){
          this._userService.getData(page, this.rateQueryKey, this.rateQueryBind).subscribe(
            data => {
              this.allRateTable.lists = this.allRateTable.lists.concat(data.data.heartRate.content);
            }
          );
        }
        this.rateFinish = true;
      }
    );
  }

  printWeight(){
    let totalPages: any;
    this._userService.getData(0, this.weightQueryKey, this.weightQueryBind).map(
      data => {
        totalPages = data.data.weight.totalPages;
        this.allWeightTable.lists = data.data.weight.content;
      }
    ).subscribe(
      () => {
        for(let page=1;page<totalPages;page++){
          this._userService.getData(page, this.weightQueryKey, this.weightQueryBind).subscribe(
            data => {
              this.allWeightTable.lists = this.allWeightTable.lists.concat(data.data.weight.content);
            }
          );
        }
        this.weightFinish = true;
      }
    );
  }

  downloadPressure(){
    this.printPressure();
    var download = setInterval(()=>{
      if(this.pressureFinish){//保证打印到表格的异步函数已经完成,应该能保证吧。。
        // console.log(this.allPressureTable);     
        let event = document.createEvent('MouseEvent');
        event.initEvent('click',false,false);
        document.getElementById('downloadPressure').dispatchEvent(event);
        clearInterval(download);
        this.pressureFinish = false;
      }
    },1000);
  }

  downloadSugar(){
    this.printSugar();
    this.sugarExcel();
    var download = setInterval(()=>{
      if(this.sugarFinish){
        // console.log(this.allSugarTable);
        let event = document.createEvent('MouseEvent');
        event.initEvent('click',false,false);
        document.getElementById('downloadSugar').dispatchEvent(event);
        clearInterval(download);
        this.sugarFinish = false;
      }
    },1000);
  }

  downloadRate(){
    this.printRate();
    this.rateExcel();
    var download = setInterval(()=>{
      if(this.rateFinish){
        // console.log(this.allRateTable);
        let event = document.createEvent('MouseEvent');
        event.initEvent('click',false,false);
        document.getElementById('downloadRate').dispatchEvent(event);
        clearInterval(download);
        this.rateFinish = false;
      }
    },1000);
  }

  downloadWeight(){
    this.printWeight();
    this.weightExcel();
    var download = setInterval(()=>{
      if(this.weightFinish){
        // console.log(this.allWeightTable);
        let event = document.createEvent('MouseEvent');
        event.initEvent('click',false,false);
        document.getElementById('downloadWeight').dispatchEvent(event);
        clearInterval(download);
        this.weightFinish = false;
      }
    },1000);
  }

  pressureExcel(){
    $('.pressureExcel').on('click', function(){
        console.log("aa");
        let myDate = new Date();
        let $this = $(this);
        let table = $("#pressure")[0];
        $this.attr('download', '全程心管家患者体征数据-血压-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }

  sugarExcel(){
    $('.sugarExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#sugar")[0];
        $this.attr('download', '全程心管家患者体征数据-血糖-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }

  rateExcel(){
    $('.rateExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#rate")[0];
        $this.attr('download', '全程心管家患者体征数据-心率-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }

  weightExcel(){
    $('.weightExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#weight")[0];
        $this.attr('download', '全程心管家患者体征数据-体重-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }
  
}
