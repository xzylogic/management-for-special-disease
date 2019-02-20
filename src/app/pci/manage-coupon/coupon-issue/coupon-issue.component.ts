import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { CouponIssueService } from './_service/coupon-issue.service';
import { CouponIssueTableService } from './_service/coupon-issue-table.service';
import { ERRMSG } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type AOA = Array<Array<any>>;

@Component({
  selector: 'app-coupon-issue',
  templateUrl: './coupon-issue.component.html',
})
export class CouponIssueComponent implements OnInit {
  containerConfig: ContainerConfig;
  couponGetTable: TableOption;
  couponUseTable: TableOption;

  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private couponIssueService: CouponIssueService,
    private couponIssueTableService: CouponIssueTableService,
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.couponIssueService.couponIssueConfig();
    this.couponGetTable = new TableOption({
      titles: this.couponIssueTableService.setTitles(),
      ifPage: true
    });
    this.couponUseTable = new TableOption({
      titles: this.couponIssueTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getCouponList(0);
    this.useCouponList(0);
  }

  getCouponList(page: number) {
    this.couponGetTable.reset(page);
    this.couponIssueService.getCoupon(
      page, this.couponGetTable.size, 0)
      .subscribe(res => {
        this.couponGetTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.couponGetTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.couponGetTable.totalPage = res.data.totalPages;
          this.couponGetTable.lists = res.data.content;
        } else {
          this.couponGetTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.couponGetTable.loading = false;
        console.log(err);
        this.couponGetTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  useCouponList(page: number) {
    this.couponUseTable.reset(page);
    this.couponIssueService.getCoupon(
      page, this.couponUseTable.size, 1)
      .subscribe(res => {
        this.couponUseTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.couponUseTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.couponUseTable.totalPage = res.data.totalPages;
          this.couponUseTable.lists = res.data.content;
        } else {
          this.couponUseTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.couponUseTable.loading = false;
        console.log(err);
        this.couponUseTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  export() {
    let exportList;
    this.couponIssueService.getCoupon(0, 2000, 0)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
          if (res.data.totalPages == 1) {
            exportList = this.common.toArray(res.data.content);
            /* generate worksheet */
            const ws = XLSX.utils.aoa_to_sheet(exportList);
            /* generate workbook and add the worksheet */
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
            /* save to file */
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
            const fileName = `优惠券发放记录列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
            saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
          } else {
            const getList = [];
            let dataList = res.data.content;
            for (let i = 1; i < res.data.totalPages; i++) {
              getList.push(this.couponIssueService.getCoupon(i, 2000, 0))
            }
            Observable.forkJoin(getList).subscribe((resList: Array<any>) => {
              for (let i = 0; i < getList.length; i++) {
                if (resList[i].code == 0 && resList[i].data && resList[i].data.content) {
                  dataList = [...dataList, ...resList[i].data.content]
                }
              }
              exportList = this.common.toArray(dataList);
              /* generate worksheet */
              const ws = XLSX.utils.aoa_to_sheet(exportList);
              /* generate workbook and add the worksheet */
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
              /* save to file */
              const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
              const fileName = `优惠券发放记录列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
              saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
            });
          }
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }
}
