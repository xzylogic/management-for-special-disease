import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

import { ContainerConfig, TableOption, HintDialog } from '../../../libs';
import { DoctorAccountService } from './_service/doctor-account.service';
import { DoctorAccountTableService } from './_service/doctor-account-table.service';
import { ERRMSG } from '../../_store/static';
import { DialogOptions } from '../../../libs/dmodal/dialog/dialog.entity';
import { ActionDialog } from '../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-doctor-account',
  templateUrl: './doctor-account.component.html'
})
export class DoctorAccountComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorAccountTable: TableOption;
  withdrawDepositTable: TableOption;
  commodityExchangeTable: TableOption;
  @select(['doctorAccount', 'tab']) tab: Observable<number>;
  @select(['doctorAccount', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private doctorAccountService: DoctorAccountService,
    private doctorAccountTableService: DoctorAccountTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorAccountService.doctorAccountConfig();
    this.doctorAccountTable = new TableOption({
      titles: this.doctorAccountTableService.setDoctorAccountTitles(),
      ifPage: true
    });
    this.withdrawDepositTable = new TableOption({
      titles: this.doctorAccountTableService.setWithdrawDepositTitles(),
      ifPage: true
    });
    this.commodityExchangeTable = new TableOption({
      titles: this.doctorAccountTableService.setCommodityExchangeTitles(),
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
    this.page.subscribe((page: Array<number>) => {
      this.getDoctorAccounts(page[0]);
    });
  }

  reset1() {
    this.page.subscribe((page: Array<number>) => {
      this.getWithdrawDeposits(page[1]);
    });
  }

  reset2() {
    this.page.subscribe((page: Array<number>) => {
      this.getCommodityExchanges(page[2]);
    });
  }

  getDoctorAccounts(page: number) {
    this.action.pageChange('doctorAccount', [page, this.withdrawDepositTable.currentPage, this.commodityExchangeTable.currentPage]);
    this.doctorAccountTable.reset(page);
    this.doctorAccountService.getDoctorAccounts(page, this.doctorAccountTable.size)
      .subscribe(
        res => {
          this.doctorAccountTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.doctorAccountTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.doctorAccountTable.totalPage = res.data.totalPages;
            this.doctorAccountTable.lists = res.data.content;
          } else {
            this.doctorAccountTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.doctorAccountTable.loading = false;
          console.log(err);
          this.doctorAccountTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getWithdrawDeposits(page: number) {
    this.action.pageChange('doctorAccount', [this.doctorAccountTable.currentPage, page, this.commodityExchangeTable.currentPage]);
    this.withdrawDepositTable.reset(page);
    this.doctorAccountService.getWithdrawDeposits(page, this.withdrawDepositTable.size)
      .subscribe(
        res => {
          this.withdrawDepositTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.withdrawDepositTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.withdrawDepositTable.totalPage = res.data.totalPages;
            this.withdrawDepositTable.lists = res.data.content;
          } else {
            this.withdrawDepositTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.withdrawDepositTable.loading = false;
          console.log(err);
          this.withdrawDepositTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getCommodityExchanges(page: number) {
    this.action.pageChange('doctorAccount', [this.doctorAccountTable.currentPage, this.withdrawDepositTable.currentPage, page]);
    this.withdrawDepositTable.reset(page);
    this.doctorAccountService.getCommodityExchanges(page, this.commodityExchangeTable.size)
      .subscribe(
        res => {
          this.commodityExchangeTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.commodityExchangeTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.commodityExchangeTable.totalPage = res.data.totalPages;
            this.commodityExchangeTable.lists = res.data.content;
          } else {
            this.commodityExchangeTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.commodityExchangeTable.loading = false;
          console.log(err);
          this.commodityExchangeTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  gotoHandle(res) {
    const data = res.value;
    if (res.key === 'totalRevenue') {
      this.router.navigate(['/doctor-account/receive-flowers'], {queryParams: {id: data.id}});
    }
    if (res.key === 'totalExpenses') {
      this.router.navigate(['/doctor-account/exchange-commodities'], {queryParams: {id: data.id}});
    }
    if (res.key === 'pay') {
      if (data.status === 0) {
        HintDialog('确定已提现成功？', this.dialog).afterClosed()
          .subscribe(result => {
            if (result && result.key === 'comfirm') {
              this.processPay(data.id);
            }
          });
      } else {
        HintDialog('已提现成功！', this.dialog);
      }
    }
    if (res.key === 'editExpress') {
      if (data.status === 0) {
        const config = new DialogOptions({
          title: '请填写快递信息',
          message: '',
          buttons: [{
            key: 'confirm',
            value: '提交',
            color: 'primary'
          }, {
            key: 'cancel',
            value: '取消',
            color: ''
          }],
          forms: [{
            key: 'expressCompany',
            label: '快递公司',
            value: ''
          }, {
            key: 'expressNumber',
            label: '快递单号',
            value: ''
          }]
        });
        ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
          if (result.key === 'confirm' && result.value[0] && result.value[1]) {
            this.processExpress(data.id, result.value[0].value, result.value[1].value);
          }
        });
      } else {
        HintDialog('已输入信息！', this.dialog);
      }
    }
    if (res.key === 'arrival') {
      if (res.value.status === 0) {
        HintDialog('请先输入快递单号', this.dialog);
      } else if (res.value.status === 1) {
        console.log(data);
        HintDialog('确定已到货？', this.dialog).afterClosed()
          .subscribe(result => {
            if (result && result.key === 'comfirm') {
              this.processReach(data.id, data.expressNo, data.expressCompany);
            }
          });
      } else {
        HintDialog('已到货', this.dialog);
      }
    }
  }

  processPay(id) {
    this.doctorAccountService.getWithdraw(id)
      .subscribe(
        res => {
          if (res.code === 0) {
            HintDialog(res.msg || '操作成功！', this.dialog);
          } else {
            HintDialog(res.msg || '操作失败～', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
  }

  processExpress(id, expressNumber, expressCompany) {
    this.getPurchaseEdit(id, expressNumber, expressCompany, 1);
  }

  processReach(id, expressNumber, expressCompany) {
    this.getPurchaseEdit(id, expressNumber, expressCompany, 2);
  }

  getPurchaseEdit(id, expressNumber, expressCompany, status) {
    this.doctorAccountService.getPurchase(
      id,
      expressNumber,
      expressCompany,
      status
    )
      .subscribe(
        res => {
          if (res.code === 0) {
            HintDialog(res.msg || '操作成功！', this.dialog);
          } else {
            HintDialog(res.msg || '操作失败～', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        })
  }

  change(index) {
    this.action.tabChange('doctor', index);
  }
}
