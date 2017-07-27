import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ContainerConfig, HintDialog } from '../../../../libs';
import { LectureService } from '../_service/lecture.service';
import { LectureFormService } from '../_service/lecture-form.service';
import { Lecture } from '../_entity/lecture.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-lecture-edit',
  templateUrl: './lecture-edit.component.html'
})
export class LectureEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['lecture', 'data']) lecture: Observable<Lecture>;
  form: any;
  errMsg = '';

  constructor(
    private lectureService: LectureService,
    private lectureFormService: LectureFormService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.lecture.subscribe(data => {
      console.log(data);
      if (data.adminId) {
        this.containerConfig = this.lectureService.lectureEditConfig(true);
        this.form = this.lectureFormService.setLectureForm();
      } else {
        this.containerConfig = this.lectureService.lectureEditConfig(false);
        this.form = this.lectureFormService.setLectureForm(
          data
        );
      }
    });
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
  getValues(data) {
    console.log(data);
    // data.joinLimitDate = this.getlectureTime(data.joinLimitDate);
    // data.date = this.getlectureTime(data.date);
    // if (data.joinLimitCount) {
    //   data.joinLimit = true;
    // } else {
    //   data.joinLimit = false;
    // }
    //
    // if (data.onlineDate) {
    //   data.onlineDate = this.getlectureTime(data.onlineDate);
    // } else {
    //   data.onlineDate = 0;
    // }
    // 修改讲座
    if (data.id) {
      this.lectureService.lectureEdit(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
                this.router.navigate(['/lecture']);
              });
            } else {
              HintDialog(res.msg || ERRMSG.saveError, this.dialog);
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.saveError, this.dialog);
          });
    } else {
      this.lectureService.lectureCreate(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
                this.router.navigate(['/lecture']);
              });
            } else {
              HintDialog(res.msg || ERRMSG.saveError, this.dialog);
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.saveError, this.dialog);
          });
    }
  }

  // //关闭模态框
  // close() {
  //   this.enable = !this.enable;
  //   this.enableChange.emit(this.enable);
  // }
}
