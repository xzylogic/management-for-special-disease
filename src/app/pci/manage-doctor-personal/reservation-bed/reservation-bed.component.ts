/**
 * Created by zhanglin on 2017/7/31.
 */
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';

import { TableOption, ContainerConfig, DialogOptions, ActionDialog, HintDialog } from '../../../libs';
import { ERRMSG } from '../../_store/static';
import { FormDate } from '../../../libs/dform/_entity/form-date';
import { FormDropdown } from '../../../libs/dform/_entity/form-dropdown';
import { ReservationBedTableService } from './_service/reservation-bed-table.service';
import { ReservationBedService } from './_service/reservation-bed.service';
import { EditDialog } from '../../../libs/dmodal/dialog/dialog-edit.component';
import { DialogEdit } from '../../../libs/dmodal/dialog/dialog.entity';

@Component ({
  selector: 'app-reservation-bed',
  templateUrl: './reservation-bed.component.html'
})
export class ReservationBedComponent implements OnInit {
  containerConfig: ContainerConfig;
  agreeTable: TableOption;
  pendingTable: TableOption;
  rejectedTable: TableOption;
  @select(['reservationBed', 'tab']) tab: Observable<number>;
  @select(['reservationBed', 'page']) page: Observable<Array<number>>;
  constructor(
    @Inject('action') private action,
    private reservationBedService: ReservationBedService,
    private reservationBedTableService: ReservationBedTableService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.reservationBedService.ReservationBedConfig();
    this.agreeTable = new TableOption({
      titles: this.reservationBedTableService.setAgreeTitles(),
      ifPage: true
    });
    this.pendingTable = new TableOption({
      titles: this.reservationBedTableService.setPendingTitles(),
      ifPage: true
    });
    this.rejectedTable = new TableOption({
      titles: this.reservationBedTableService.setRejectedTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
  }

  reset0() {
    this.agreeTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getAgreeReservationBed(page[0]);
    });
  }

  reset1() {
    this.pendingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getPendingReservationBed(page[1]);
    });
  }

  reset2() {
    this.rejectedTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getRejectedReservationBed(page[2]);
    });
  }

  getAgreeReservationBed(page: number) {
    this.action.pageChange('reservationBed', [page, this.pendingTable.currentPage, this.rejectedTable.currentPage]);
    this.agreeTable.reset(page);
    this.reservationBedService.agree(page, 20, 2, this.agreeTable.queryKey)
      .subscribe(res => {
        this.agreeTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.agreeTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.agreeTable.totalPage = res.data.totalPages;
          this.formatAgree(res.data.content);
          this.agreeTable.lists = res.data.content;
        } else {
          this.agreeTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.agreeTable.loading = false;
        console.log(err);
        this.agreeTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  formatAgree(list: Array<any>) {
    list.forEach(data => {
      if (data.status == 0) {
        data.status = '已就诊';
      }else if (data.status == 1) {
        data.status = '未就诊';
      }else if (data.status == 2) {
        data.status = '已入院';
      }else if (data.status == 3) {
        data.status = '未入院';
      }
    });
  }

  getPendingReservationBed(page: number) {
    this.action.pageChange('reservationBed', [this.agreeTable.currentPage, page, this.rejectedTable.currentPage]);
    this.pendingTable.reset(page);
    this.reservationBedService.pending(page, 20, 2, this.pendingTable.queryKey)
      .subscribe(res => {
        this.pendingTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.pendingTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.pendingTable.totalPage = res.data.totalPages;
          this.pendingTable.lists = res.data.content;
        } else {
          this.pendingTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.pendingTable.loading = false;
        console.log(err);
        this.pendingTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getRejectedReservationBed(page: number) {
    this.action.pageChange('reservationBed', [this.agreeTable.currentPage, this.pendingTable.currentPage, page]);
    this.rejectedTable.reset(page);
    this.reservationBedService.rejected(page, 20, 2, this.rejectedTable.queryKey)
      .subscribe(res => {
        this.rejectedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.rejectedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.rejectedTable.totalPage = res.data.totalPages;
          this.rejectedTable.lists = res.data.content;
        } else {
          this.rejectedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.rejectedTable.loading = false;
        console.log(err);
        this.rejectedTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  gotoHandle(res) {
    if (res.key === 'edit') {
      const config: DialogEdit = new DialogEdit({
        title: `编辑`,
        form: [
          new FormDate({
            key: 'date',
            label: '可就诊时间',
            value: '',
            required: true,
            order: 0
          }),
          new FormDropdown({
            key: 'status',
            label: '状态',
            value: '',
            required: true,
            options: [{
              id: 0,
              name: '已就诊'
            }, {
              id: 1,
              name: '未就诊'
            }, {
              id: 2,
              name: '已入院'
            }, {
              id: 3,
              name: '未入院'
            }],
            order: 1
          })
        ]
      });
      EditDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result) {
          this.editInfo(result.status, res.value.orderId, result.date);
        }
      });
    }else if (res.key === 'agree') {
      const config: DialogEdit = new DialogEdit({
        title: `选择就诊时间`,
        form: [
          new FormDate({
            key: 'date',
            label: '',
            value: '',
            required: true,
            validated: true,
          })
        ]
      });
      EditDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result) {
          this.toAgree(res.value.orderId, result.date);
        }
      });
    } else if (res.key === 'disagree') {
      const config = new DialogOptions({
        title: `确认拒绝么？`,
        message: '',
        buttons: [{
          key: 'torefuse',
          value: '确认',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'torefuse') {
          this.toDisagree(res.value.orderId);
        }
      });
    }
  }

  editInfo(status, id, date) {
    this.reservationBedService.editInfo(status, id, date)
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

  toAgree(id, date) {
    this.reservationBedService.agreeOrDisagreeApply(1, id, date)
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

  toDisagree(id) {
    this.reservationBedService.agreeOrDisagreeApply(2, id)
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

  change(index) {
    this.action.tabChange('reservationBed', index);
  }
}
