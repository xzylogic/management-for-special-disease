import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContainerConfig } from '../../../../libs';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { LectureService } from '../_service/lecture.service';
import { LectureAuditingTableService } from '../_service/lecture-auditing-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-lecture-sign',
  templateUrl: './lecture-sign.component.html',
})
export class LectureSignComponent implements OnInit {
  containerConfig: ContainerConfig;
  lectureDetailTable: TableOption;

  id: number;
  // modalTitle: string = '讲座报名/签到人数明细';
  // @Input() data: any;
  // @Input() enable: boolean;
  // @Output() enableChange: EventEmitter < any > = new EventEmitter();
  //
  // errorMessage: string;
  // signStatusList: Array < any > = [{
  //   id: 0,
  //   name: "未签到"
  // }, {
  //   id: 1,
  //   name: "已签到"
  // }];
  // joinStatusList: Array < any > = [{
  //   id: 0,
  //   name: "未报名"
  // }, {
  //   id: 1,
  //   name: "已报名"
  // }, {
  //   id: 2,
  //   name: "已取消"
  // }];
  //
  signStatus: any;
  joinStatus: any;
  //
  // lectureAuditingTable: TableOption = new TableOption();

  constructor(
    private lectureService: LectureService,
    private lectureAuditingTableService: LectureAuditingTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.lectureService.lectureDdetailConfig();
    this.lectureDetailTable = new TableOption({
      titles: this.lectureAuditingTableService.setTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.lectureDetailTable.loading = false;
        this.lectureDetailTable.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getLectureAuditings(this.id, 0);
      }
    });
  }


  // getLectureAuditingTitles() {
  //     this.lectureAuditingTable.titles = this._lectureAuditingTableService.setTitles();
  //   }
  //
  getLectureAuditings(id, page: number) {
    this.lectureDetailTable.reset(page);
    this.lectureService.getApply(
        id,
        this.signStatus || '',
        this.joinStatus || '',
        page,
        0
        )
      .subscribe(
         res => {
          this.lectureDetailTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.lectureDetailTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.lectureDetailTable.totalPage = res.data.totalPages;
            this.lectureDetailTable.lists = res.data.content;
          } else {
            this.lectureDetailTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.lectureDetailTable.loading = false;
          this.lectureDetailTable.errorMessage = ERRMSG.netErrMsg;
        })
  }
  //
  // //时间转换
  //  getTime(time){
  //   var date = new Date(time);
  //   var Y = date.getFullYear() + '-';
  //   var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  //   var D = date.getDate() + ' ';
  //   var h = date.getHours() + ':';
  //   var m = date.getMinutes() + ':';
  //   var s = date.getSeconds();
  //    return Y+M+D+h+m+s;
  // }
  //  //关闭模态框
  //  close() {
  //     this.enable = !this.enable;
  //     this.enableChange.emit(this.enable);
  //   }
  //
  //  resetUser() {
  //   this.signStatus = '';
  //   this.joinStatus = '';
  //   $('.text').text('按报名状态搜索');
  //   this.getLectureAuditings(0);
  // }
  //
  //  //刷新页面
  // refresh(){
  //   this.getLectureAuditings(0);
  // }

}
