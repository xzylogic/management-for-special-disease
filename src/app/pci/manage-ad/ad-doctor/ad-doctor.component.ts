import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AdDoctorService } from './_service/ad-doctor.service';
import { AdDoctorTableService } from './_service/ad-doctor-table.service';
import { AdDoctor } from './_entity/ad-doctor.entity';
import { ERRMSG } from '../../_store/static';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog/dialog.entity';

@Component({
  selector: 'app-ad-doctor',
  templateUrl: './ad-doctor.component.html'
})
export class AdDoctorComponent implements OnInit {
  containerConfig: ContainerConfig;
  adDoctorTable: TableOption;
  @select(['AdDoctor', 'tab']) tab: Observable<number>;
  @select(['AdDoctor', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('auth') private auth,
    private adDoctorService: AdDoctorService,
    private adDoctorTableService: AdDoctorTableService,
    private dialog: MdDialog,
    private router: Router
  ) {
    action.dataChange('adDoctorService', new AdDoctor());
  }

  ngOnInit() {
    this.containerConfig = this.adDoctorService.adDoctorConfig();
    this.adDoctorTable = new TableOption({
      titles: this.adDoctorTableService.setAdDoctorTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getAdDoctor(0);
    });
  }

  getAdDoctor(page: number) {
    this.action.pageChange('adDoctorService', [page]);
    this.adDoctorService.getAdList(page)
      .subscribe(res => {
        this.adDoctorTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.length === 0) {
          this.adDoctorTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.adDoctorTable.totalPage = res.data.totalPages;
          this.adDoctorTable.lists = res.data.content;
          console.log(this.adDoctorTable.lists);
        } else {
          this.adDoctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.adDoctorTable.loading = false;
        console.log(err);
        this.adDoctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('adDoctor', new AdDoctor());
    this.router.navigate(['/ad-doctor/edit']);
  }

  gotoHandle(res) {
    const adDoctor = <AdDoctor>res.value;
    console.log(res);
    if (res.key === 'edit') {
      this.action.dataChange('adDoctor', adDoctor);
      this.router.navigate(['/ad-doctor/edit']);
    }
    else if (res.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${adDoctor.title}？`,
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
    }
    else if (res.key === 'updown') {
      if (!res.value.status) {
        const config = new DialogOptions({
          title: `您确定要上架${adDoctor.title}？`,
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
          title: `您确定要下架${adDoctor.title}？`,
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
    this.adDoctorService.adDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.deleteSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdDoctor(0);
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
    this.adDoctorService.adStatus(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.updownSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdDoctor(0);
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
