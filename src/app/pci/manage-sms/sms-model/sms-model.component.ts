import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { SmsModelService } from './_service/sms-model.service';
import { SmsModelTableService } from './_service/sms-model-table.service';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

import { saveAs } from 'file-saver';
import {ActivatedRoute, Router} from "@angular/router";
// import {MatDialogComponent} from "../matDialog/matDialog.component";

@Component({
  selector: 'app-sms-model',
  templateUrl: './sms-model.component.html',
})
export class SmsModelComponent implements OnInit {

  ContainerConfig: ContainerConfig;
  smsModelTable: TableOption;

  subscribeHDialog: any;
  // public templateId: string;
  // public description: string;
  // public content: string;
  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private smsModelService: SmsModelService,
    private smsModelTableService: SmsModelTableService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.ContainerConfig = this.smsModelService.smsModelConfig();
    this.smsModelTable = new TableOption({
      titles: this.smsModelTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.smsModelTable.queryKey = '';
    this.getSmsModel(0);
  }

  getStatus(list) {
    // if (typeof list === 'object') {
    list.forEach(obj => {
      obj.enableRole = obj.enableRole ? '可用' : '禁用';
    });
    // }
  }

  addTemplate() {
    this.router.navigate(['/sms-model', 'config']);
  }

  gotoHandle(res) {
    const id = res.value.id;
    // this.subscribeHDialog = HintDialog(
    //   `你确定要 ${res.value.enable === '可用' ? '禁用' : '启用'} 吗？`,
    //   this.dialog
    // ).afterClosed().subscribe(result => {
    //   if (result && result.key === 'confirm') {
    //     this.smsModelService.enableSmsModel(id).subscribe(res => {
    //       if (res.code === 0) {
    //         this.getSmsModel(0);
    //         HintDialog(res.msg || '操作成功！', this.dialog);
    //       } else {
    //         HintDialog(res.msg || '操作失败～', this.dialog);
    //       }
    //     }, err => {
    //       console.log(err);
    //       HintDialog(ERRMSG.netErrMsg, this.dialog);
    //     });
    //   }
    // });
    if (res.key === 'config' && res.value) {
      this.smsModelService.smsData = {
        templateId: res.value.templateId,
        description: res.value.description,
        content: res.value.content,
      }
      this.router.navigate(['/sms-model', 'config'], {queryParams: {id: id}});
    }
    if (res.key === 'enable' && res.value) {
      this.subscribeHDialog = HintDialog(
        `你确定要${res.value.enable === true ? '禁用' : '启用'}模板：${res.value.templateId}？`,
        this.dialog
      ).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          const enable = res.value.enable === true ? 1 : 0;
          this.enableMenu(res.value.templateId, enable);
        }
      });
    }
  }

  getSmsModel(page: number) {
    this.smsModelTable.reset(page);
    // console.log(page, this.smsModelTable.size, this.smsModelTable.queryKey)
    this.smsModelService.getData(page, this.smsModelTable.size, this.smsModelTable.queryKey)
      .subscribe(
        res => {
          this.smsModelTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.smsModelTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.smsModelTable.totalPage = res.data.totalPages;
            this.getStatus(res.data.content);
            this.smsModelTable.lists = res.data.content;
          } else {
            this.smsModelTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.smsModelTable.loading = false;
          console.log(err);
          this.smsModelTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  enableMenu(id, flag) {
    this.smsModelService.enableSmsModel(id).subscribe(res => {
      if (res.code === 0) {
        this.getSmsModel(0);
        HintDialog(res.msg || '操作成功！', this.dialog);
      } else {
        HintDialog(res.msg || '操作失败～', this.dialog);
      }
    }, err => {
      console.log(err);
      HintDialog(ERRMSG.netErrMsg, this.dialog);
    });
  }
  // export() {
  //   let exportList;
  //   this.smsModelService.getData(0, 99999, this.smsModelTable.queryKey)
  //     .subscribe(res => {
  //       if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
  //         exportList = this.common.toArray(res.data.content);
  //         /* generate worksheet */
  //         const ws = XLSX.utils.aoa_to_sheet(exportList);
  //         /* generate workbook and add the worksheet */
  //         const wb = XLSX.utils.book_new();
  //         XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
  //         /* save to file */
  //         const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
  //         const fileName = `病例统计列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
  //         saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
  //       } else {
  //         HintDialog('导出数据错误，请重新尝试', this.dialog);
  //       }
  //     }, err => {
  //       console.log(err);
  //       HintDialog('导出数据错误，请重新尝试', this.dialog);
  //     });
  // }
}
