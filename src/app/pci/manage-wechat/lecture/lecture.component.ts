import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { LectureService } from './_service/lecture.service';
import { LectureTableService } from './_service/lecture-table.service';
import { Lecture } from './_entity/lecture.entity';
import {
  TableOption, ContainerConfig, DialogOptions,
  ImageDialog, ActionDialog, HintDialog, ControlType
} from '../../../libs';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {
  containerConfig: ContainerConfig;
  lectureTable: TableOption;

  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    private lectureService: LectureService,
    private lectureTableService: LectureTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('lecture', new Lecture());
  }

  ngOnInit() {
    this.containerConfig = this.lectureService.lectureConfig();
    this.lectureTable = new TableOption({
      titles: this.lectureTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getLectures();
  }
  getLectures() {
      this.lectureService.getLecture()
        .subscribe(
          res => {
            this.lectureTable.loading = false;
            if (res.data && res.data.length === 0 && res.code === 0) {
              this.lectureTable.errorMessage = ERRMSG.nullMsg;
            } else if (res.data && res.code === 0) {
              this.lectureTable.lists = res.data.content;
              for (let i = 0; i < this.lectureTable.lists.length; ++i) {
                this.lectureTable.lists[i].state = this.getStatus(this.lectureTable.lists[i].status);
              }
            } else {
              this.lectureTable.errorMessage = res.msg || ERRMSG.otherMsg;
            }
          }, err => {
            this.lectureTable.loading = false;
            this.lectureTable.errorMessage = ERRMSG.netErrMsg;
          })
  }

  getStatus(status) {
    if (status === 0) {
      return '上线'
    } else if (status === 1) {
      return '下线'
    } else if (status === 2) {
      return ' '
    }
  }

  newData() {
    this.action.dataChange('lecture', new Lecture());
    this.router.navigate(['/lecture/edit']);
  }

  gotoHandle(res, list) {
    console.log(res);
    const lecture = <Lecture>list;
    if (res === 'signCodeUrl') {
      ImageDialog(lecture.name, lecture.signCodeUrl, this.dialog);
    }
    if (res === 'edit') {
      this.action.dataChange('lecture', lecture);
      this.router.navigate(['/lecture/edit']);
    }
    if (res === 'joinCount') {
      // this.action.dataChange('doctor', doctor);
      this.router.navigate(['/lecture/detail'], {queryParams: {id: lecture.id}});
    }
    if (res === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除讲座${lecture.name}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'topass') {
          // this.toPassAuditing(doctor.id);
        }
      });
    }
    if (res === 'state') {
      this.operationLecture(lecture.name, list.state)
    }
  }

  // 讲座上下线
  operationLecture(name, state) {

    const config = new DialogOptions({
      title: `您确定要${state}讲座${name}？`,
      message: '',
      buttons: [{
        key: 'topass',
        value: '确定',
        color: 'primary'
      }, {
        key: 'tocancel',
        value: '取消',
        color: ''
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'topass') {
        // this.toRefuseAuditing(doctor.id);
      }
    });
  }

  toRefuseAuditing(data) {
    this.lectureService.lectureStatus(data)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }
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
