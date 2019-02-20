import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { CaseCountService } from './_service/case-count.service';
import { CaseCountTableService } from './_service/case-count-table.service';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../../pci/_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-case-count',
  templateUrl: './case-count.component.html',
})
export class CaseCountComponent implements OnInit {

  containerConfig: ContainerConfig;
  caseCountTable: TableOption;

  count: number;
  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private CaseCountService: CaseCountService,
    private CaseCountTableService: CaseCountTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.CaseCountService.caseCountConfig();
    this.caseCountTable = new TableOption({
      titles: this.CaseCountTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.caseCountTable.queryKey = '';
    this.getmedicationRemind(0);
  }

  getmedicationRemind(page: number) {
    this.caseCountTable.reset(page);
    // console.log(page, this.caseCountTable.size, this.caseCountTable.queryKey)
    this.CaseCountService.getData(page, this.caseCountTable.size, this.caseCountTable.queryKey)
      .subscribe(
        res => {
          this.caseCountTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.caseCountTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.caseCountTable.totalPage = res.data.totalPages;
            this.caseCountTable.lists = res.data.content;
          } else {
            this.caseCountTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.caseCountTable.loading = false;
          console.log(err);
          this.caseCountTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
  export() {
    let exportList;
    // this.CaseCountService.getData(0, 99999, this.caseCountTable.queryKey)
    this.CaseCountService.getData(0, 2000, this.caseCountTable.queryKey)
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
            const fileName = `病例统计列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
            saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
          } else {
            const getList = [];
            let dataList = res.data.content;
            for (let i = 1; i < res.data.totalPages; i++) {
              getList.push(this.CaseCountService.getData(i, 2000, this.caseCountTable.queryKey))
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
              const fileName = `病例统计列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
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
