import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TableOption } from '../../../entities';

import { UserService, UserTableService } from './_service';

declare var $: any;
declare var ExcellentExport:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  title = '患者信息管理';
  subTitle = '患者信息列表';

  userTable: TableOption = new TableOption();
  userAllTable: TableOption = new TableOption();
  hospitalTable: TableOption = new TableOption();

  queryKey: string = '';
  queryBind: boolean = false;

  private timer;
  lists=[];
  page:number;
  exportShow: boolean =false;
  success: boolean;

  status: string = '';
  enableEdit: boolean;
  user: any;

  totalElements:any;

  integral:any;
  enableDetail:any;

  message: string;
  enableShow: boolean;

  constructor(
    private _userService: UserService,
    private _userTableService: UserTableService
  ) {}

  ngOnInit() {
    this.getUserTitles();
    this.getUsers(0);
    this.getHospitalType();
    this.doctorExcel();
  }

  ngAfterViewInit() {
    $('#list').dropdown();
  }

  getUserTitles() {
    this.userTable.titles = this._userTableService.setTitles();
  }

  refresh() {
    this.queryKey = '';
    this.queryBind = false;
    $('.text').text('是否绑定微信服务号');
    $('.text').addClass('default');
    this.getUsers(0);
  }

  getHospitalType() {
    this._userService.getOptions()
      .subscribe(
        data => {
          if (data.code == 0) {
            this.hospitalTable = data.data.hospitalList;
          }
      })
  }

  getUsers(page: number) {
    this.userTable.lists = null;
    this.userTable.loading = true;
    this.userTable.errorMessage = '';
    this.userTable.currentPage = page;
    this._userService.getUsers(this.queryKey, this.queryBind, page, this.userTable.size)
      .subscribe(
        data => {
          this.userTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userTable.errorMessage = "该数据为空哦～";
          } else if (data.data && data.data.content && data.code === 0) {
            this.userTable.totalPage = data.data.totalPages;
            this.totalElements = data.data.totalElements;
            this.formatUser(data.data.content);
            this.userTable.lists = data.data.content;
            for (let i = 0; i < this.userTable.lists.length; ++i) {
              this.userTable.lists[i].lastOperationDate = this.getDate(this.userTable.lists[i].lastOperationDate);
            }
          } else {
            this.userTable.errorMessage = "空空如也～";
          }
        }, err => {
          this.userTable.loading = false;
          this.userTable.errorMessage = "啊哦！接口访问出错啦～";
        })
  }

  formatUser(list: Array < any > ) {
    list.forEach(data => {
      data.hospitalId = data.hospital && data.hospital.id || '';
      data.hospitalName = data.hospital && data.hospital.name || '';
      if (data.sex === 0) {
        data.sexName = '男';
      }
      if (data.sex === 1) {
        data.sexName = '女';
      }
    })
  }

  //时间转换
  getDate(time){
    if(time){
      let d = new Date(time);
      var date = (d.getFullYear()) + "-" + 
               (d.getMonth() + 1) + "-" +
               (d.getDate()) + " " + 
               (d.getHours()) + ":" + 
               (d.getMinutes()) + ":" + 
               (d.getSeconds());
    }else{
      date = "";
    }
    return date;
  }

  //获取医院下拉框选项
  getHospitals() {
    this._userService.getOptions()
      .subscribe(
        data => {
          if (data.code === 0) {
            this.hospitalTable.lists = data.data.content;
          }
      })
  }

  gotoHandle(data) {
    if (data.key == 'edit') {
      this.user = data.value;
      this.enableEdit = true;
    }else if(data.key == "integral"){
      this.integral = data;
      this.enableDetail = true;
    }
  }

  newUser() {
    this.user = null;
    this.enableEdit = true;
  }

  handleSuccess(data) {
    this.message = data;
    this.enableShow = true;
    this.getUsers(0);
  }

  getSex(sex) {
    if (sex === 0) {
      return '男';
    }
    if (sex === 1) {
      return '女';
    }
    return null;
  }

  //打印excel;
  doctorVia(data){
    var size = 0;
    let maxSize = Math.ceil(data/200);
    if(data <= 200){
      this.getUserLists(size);
      this.success = true;
    }else{
      this.timer = setInterval(() => {
        this.getUserLists(size);
        this.page = size;
        size++;
        if( size == maxSize){
          clearInterval(this.timer);
          this.success = true;
        }
      },200);
    }
  }

  //分批次请求数据
  getUserLists(page){
    this._userService.getUsers(this.queryKey, this.queryBind,page,200)
      .subscribe(
        data => {
          for (var i = 0; i < data.data.content.length; ++i) {
            this.lists.push(data.data.content[i]);
          }
          this.userAllTable.lists = this.lists;
          this.formatUser(data.data.content);
          for (let i = 0; i < this.userAllTable.lists.length; ++i) {
            this.userAllTable.lists[i].lastOperationDate = this.getDate(this.userAllTable.lists[i].lastOperationDate);
          }
    })
  }

  export(){
    let count = this.totalElements
    this.exportShow = true;
    this.success = false;
    this.doctorVia(count);
  }

  doctorExcel(){
    $('.userExcel').on('click', function(){
        let myDate = new Date();
        let $this = $(this);
        let table = $("#table")[0];
        $this.attr('download', '全程心管家患者信息列表-'+myDate.toLocaleDateString()+'.xls');
        ExcellentExport.excel(this, table);
    });
  }

  close() {
    this.exportShow = !this.exportShow;
  }
  
}
