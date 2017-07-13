import { Component, OnInit } from '@angular/core';
import { LectureService } from './_service/lecture.service';
import { LectureTableService } from './_service/lecture-table.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  // title = '服务号管理';
  // subTitle = '讲座管理';
  // loading: boolean = true;
  //
  // // 展示信息模态框选项
  // titleShow: string;
  // message: string;
  // enableShow: boolean;
  // errorMessage: string;
  //
  // Lecture: any;
  // enableEdit: boolean;
  // enableSign: boolean;
  //
  // imgUrls: Array < any > ;
  // enableImg: boolean;
  //
  // enableProcess: boolean;
  // processMessage: string;
  // processData: any;
  // data: any;
  //
  // lectureTable: TableOption = new TableOption();

  constructor(
    private _lectureService: LectureService,
    private _lectureTableService: LectureTableService
  ) {
  }

  ngOnInit() {
    // this.getLectureTitles();
    // this.getLectures();
  }

  // getLectureTitles() {
  //   this.lectureTable.titles = this._lectureTableService.setTitles();
  // }
  //
  // getLectures() {
  //     this._lectureService.getLecture()
  //       .subscribe(
  //         data => {
  //           this.lectureTable.loading = false;
  //           if (data.data && data.data.length === 0 && data.code === 0) {
  //             this.lectureTable.errorMessage = "该数据为空哦～";
  //           } else if (data.data && data.code === 0) {
  //             this.lectureTable.lists = data.data.content;
  //             for (let i = 0; i < this.lectureTable.lists.length; ++i) {
  //               this.lectureTable.lists[i].lecturetime = this.getTime(this.lectureTable.lists[i].date);
  //               this.lectureTable.lists[i].deadline = this.getTime(this.lectureTable.lists[i].joinLimitDate);
  //               this.lectureTable.lists[i].Uptime = this.getTime(this.lectureTable.lists[i].onlineDate);
  //             }
  //           } else {
  //             this.lectureTable.errorMessage = "空空如也～";
  //           }
  //         }, err => {
  //           this.lectureTable.loading = false;
  //           this.lectureTable.errorMessage = "啊哦！接口访问出错啦～";
  //         })
  // }
  //   //时间转换
  // getTime(time) {
  //   var date = new Date(time);
  //   var Y = date.getFullYear().toString();
  //   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
  //   var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
  //   var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
  //   var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();
  //   var datetime = `${Y}-${M}-${D}T${h}:${m}`;
  //   return datetime.replace("T", " ");
  // }
  // //编辑讲座
  // gotoHandle(data) {
  //     if (data.key === 1) {
  //       this.processData = data;
  //       this.processMessage = '你确定要上线？';
  //       this.enableProcess = true;
  //     } else if (data.key === "joinCount") {
  //       this.Lecture = data;
  //       this.enableSign = true;
  //     } else if (data.key === 2) {
  //       this.processData = data;
  //       this.processMessage = '你确定要下线？';
  //       this.enableProcess = true;
  //     } else if (data.key === 4) {
  //       this.Lecture = data;
  //       this.enableEdit = true;
  //     } else if (data.key === 3) {
  //       this.processData = data;
  //       this.processMessage = '你确定要删除？';
  //       this.enableProcess = true;
  //     } else if (data.key === "signCodeUrl") {
  //       this.imgUrls = [];
  //       this.imgUrls.push(data.value[data.key]);
  //       this.enableImg = true;
  //     }
  //   }
  //   //刷新页面
  // refresh() {
  //   this.getLectures();
  // }
  //
  // //新增讲座
  // newlecture() {
  //   this.Lecture = null;
  //   this.enableEdit = true;
  // }
  //
  //
  // //确定上线、下线、删除
  // process() {
  //   var data = {
  //     id: "",
  //     admin: "",
  //     status: ""
  //   }
  //   data.id = this.processData.value.id;
  //   data.status = this.processData.key;
  //   data.admin = this.admin.getId();
  //   this._lectureService.lectureStatus(data)
  //     .subscribe(
  //       data => {
  //         this.enableProcess = false;
  //         if (data.code === 0) {
  //           this.titleShow = "提示信息"
  //           this.message = "操作成功";
  //           this.enableShow = true;
  //           this.refresh();
  //         } else {
  //           this.titleShow = "提示信息"
  //           this.message = "操作失败";
  //           this.enableShow = true;
  //         }
  //       }, err => {
  //         this.enableProcess = false;
  //         this.titleShow = "提示信息"
  //         this.message = "啊哦！访问出错啦～";
  //         this.enableShow = true;
  //       })
  // }
  //
  // //取消上线、下线、删除
  // processCancel() {
  //   this.processData = null;
  //   this.processMessage = '';
  //   this.enableProcess = false;
  // }
  //
  // //返回服务器信息
  // handleSuccess(data) {
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
