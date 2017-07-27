import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';
import { AdPatientService } from './_service/ad-patient.service';
import { AdPatientTableService } from './_service/ad-patient-table.service';
import { AdPatient } from './_entity/ad-patient.entity';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog/dialog.entity';

@Component({
  selector: 'app-ad-patient',
  templateUrl: './ad-patient.component.html'
})
export class AdPatientComponent implements OnInit {
  containerConfig: ContainerConfig;
  adPatientTable: TableOption;
  @select(['AdPatient', 'tab']) tab: Observable<number>;
  @select(['AdPatient', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private adPatientService: AdPatientService,
    private adPatientTableService: AdPatientTableService,
    private dialog: MdDialog,
    private router: Router,
    @Inject('auth') private auth
  ) {
    action.dataChange('adPatientService', new AdPatient());
  }

  ngOnInit() {
    this.containerConfig = this.adPatientService.adPatientConfig();
    this.adPatientTable = new TableOption({
      titles: this.adPatientTableService.setAdPatientTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getAdPatient(0);
    });
  }

  getAdPatient(page: number) {
    this.action.pageChange('packageService', [page]);
    this.adPatientService.getAdList(page)
      .subscribe(res => {
        this.adPatientTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.length === 0) {
          this.adPatientTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.adPatientTable.totalPage = res.data.totalPages;
          this.adPatientTable.lists = res.data.content;
        } else {
          this.adPatientTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.adPatientTable.loading = false;
        console.log(err);
        this.adPatientTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('adPatient', new AdPatient());
    this.router.navigate(['/ad-patient/edit']);
  }

  gotoHandle(res) {
    const adPatient = <AdPatient>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('adPatient', adPatient);
      this.router.navigate(['/ad-patient/edit']);
    }else if (res.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${adPatient.title}？`,
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
        if (result.key === 'topass') {
          this.delete(res.value.id);
        }
      });
    } else if (res.key === 'updown') {
      if (!res.value.status) {
        const config = new DialogOptions({
          title: `您确定要上架${adPatient.title}？`,
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
          if (result.key === 'topass') {
            this.updown(res.value.id);
            ERRMSG.updownSuccess = '上架成功';
            ERRMSG.updownError = '上架失败';
          }
        });

      }else {
        const config = new DialogOptions({
          title: `您确定要下架${adPatient.title}？`,
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
          if (result.key === 'topass') {
            this.updown(res.value.id);
            ERRMSG.updownSuccess = '下架成功';
            ERRMSG.updownError = '下架失败';
          }
        });

      }
    }
  }

  delete(id: number) {
    this.adPatientService.adDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.deleteSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdPatient(0);
            });
          });
        } else {
          HintDialog(res.msg || ERRMSG.deleteError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.deleteError, this.dialog);
      });
  }

  updown(id: number) {
    this.adPatientService.adStatus(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.updownSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdPatient(0);
            });
          });
        } else {
          HintDialog(res.msg || ERRMSG.updownError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.updownError, this.dialog);
      });
  }
}
