import { Component, OnInit } from '@angular/core';

import { LectureService } from '../_service/lecture.service';
import { LectureAuditingTableService } from '../_service/lecture-auditing-table.service';

@Component({
  selector: 'app-lecture-sign',
  templateUrl: './lecture-sign.component.html',
})
export class LectureSignComponent implements OnInit {
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
  // signStatus: any;
  // joinStatus: any;
  //
  // lectureAuditingTable: TableOption = new TableOption();

  constructor(
    private _lectureService: LectureService,
    private _lectureAuditingTableService: LectureAuditingTableService
  ) {
  }

  ngOnInit() {
    // this.getLectureAuditingTitles();
    // this.getLectureAuditings(0);
  }

  ngAfterViewInit() {
    // $('#joinStatus').dropdown();
    // $('#signStatus').dropdown();
  }

  // getLectureAuditingTitles() {
  //     this.lectureAuditingTable.titles = this._lectureAuditingTableService.setTitles();
  //   }
  //
  // getLectureAuditings(page: number) {
  //   this.lectureAuditingTable.currentPage = page;
  //   this._lectureService.getApply(
  //       this.data.value.id,
  //       this.signStatus || '',
  //       this.joinStatus || "",
  //       page,
  //       0
  //       )
  //     .subscribe(
  //        data => {
  //         this.lectureAuditingTable.loading = false;
  //         if (data.data && data.data.length === 0 && data.code === 0) {
  //           this.lectureAuditingTable.errorMessage = "该数据为空哦～";
  //         } else if (data.data && data.code === 0) {
  //           this.lectureAuditingTable.totalPage = data.data.totalPages;
  //           this.lectureAuditingTable.lists = data.data.content;
  //           for (var i = 0; i < this.lectureAuditingTable.lists.length; ++i) {
  //             this.lectureAuditingTable.lists[i].joinDate = this.getTime(this.lectureAuditingTable.lists[i].joinDate);
  //           }
  //         } else {
  //           this.lectureAuditingTable.errorMessage = "空空如也～";
  //         }
  //       },err =>{
  //         this.lectureAuditingTable.loading = false;
  //         this.lectureAuditingTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
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
