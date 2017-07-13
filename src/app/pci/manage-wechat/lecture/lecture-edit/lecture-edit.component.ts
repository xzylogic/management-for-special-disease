import { Component, OnInit } from '@angular/core';

import { LectureService } from '../_service/lecture.service';
import { LectureFormService } from '../_service/lecture-form.service';

@Component({
  selector: 'app-lecture-edit',
  template: `
    <h1>lecture edit</h1>
  `
})
export class LectureEditComponent implements OnInit {

  constructor(
    private _lectureService: LectureService,
    private _lectureFormService: LectureFormService,
  ) {
  }

  ngOnInit() {
    // this.setLectureForm();
  }

  // ngAfterViewInit(){
  //   this.lectureDate();
  // }
  //
  // lectureDate(){
  //   $("#date").flatpickr({
  //     "locale": "zh",
  //     "enableTime":true
  //   });
  //   $("#joinLimitDate").flatpickr({
  //     "locale": "zh",
  //     "enableTime":true
  //   });
  // }
  // //编辑时间转换
  // getTime(time) {
  //   var date = new Date(time);
  //   var Y = date.getFullYear().toString();
  //   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString();
  //   var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
  //   var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()).toString();
  //   var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()).toString();
  //   return `${Y}-${M}-${D}T${h}:${m}`
  // }
  //
  //
  // setLectureForm() {
  //   if (this.data) {
  //     this.data.value.date = this.getTime(this.data.value.date);
  //     this.data.value.joinLimitDate = this.getTime(this.data.value.joinLimitDate);
  //     this.data.value.onlineDate = this.getTime(this.data.value.onlineDate);
  //     this.modalTitle = "编辑讲座";
  //     this.formDatas = this._lectureFormService.setLectureForm(this.data.value);
  //   } else {
  //     this.modalTitle = "新增讲座";
  //     this.formDatas = this._lectureFormService.setLectureForm();
  //   }
  // }
  //
  // //提交时间转换
  // getlectureTime(date) {
  //   var newstr = date.replace("T"," ");
  //   var time = new Date(newstr.replace(/-/g, '/'));
  //   return time.getTime();
  // }
  //
  // //提交保存信息
  // getValue(data) {
  //   data.joinLimitDate = this.getlectureTime(data.joinLimitDate);
  //   data.date = this.getlectureTime(data.date);
  //   if (data.joinLimitCount) {
  //     data.joinLimit = true;
  //   } else {
  //     data.joinLimit = false;
  //   }
  //
  //   if (data.onlineDate) {
  //     data.onlineDate = this.getlectureTime(data.onlineDate);
  //   } else {
  //     data.onlineDate = 0;
  //   }
  //   //修改讲座
  //   if (this.data) {
  //     this._lectureService.lectureEdit(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit("讲座修改成功！");
  //             this.close();
  //           } else {
  //             if (data.msg) {
  //               this.errorMessage = data.msg;
  //             } else {
  //               this.errorMessage = "操作失败！";
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = "啊哦！访问出错啦～";
  //         })
  //   } else {
  //     this._lectureService.lectureCreate(data)
  //       .subscribe(
  //         data => {
  //           if (data.code === 0) {
  //             this.handleEmit.emit("新增讲座成功！");
  //             this.close();
  //           } else {
  //             if (data.msg) {
  //               this.errorMessage = data.msg;
  //             } else {
  //               this.errorMessage = "操作失败！";
  //             }
  //           }
  //         }, err => {
  //           this.errorMessage = "啊哦！访问出错啦～";
  //         })
  //   }
  // }
  //
  // //关闭模态框
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
