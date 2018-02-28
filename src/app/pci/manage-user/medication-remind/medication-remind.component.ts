import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
// import { ImageDialog } from '../../../libs/dmodal/dialog-img.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { MedicationRemindService } from './_service/medication-remind.service';
import { MedicationRemindTableService } from './_service/medication-remind-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-medication-remind',
  templateUrl: './medication-remind.component.html'
})
export class MedicationRemindComponent implements OnInit {

  containerConfig: ContainerConfig;
  medicationRemindTable: TableOption;

  @select(['medicationRemind', 'page']) page: Observable<Array<number>>;

  deleted: any;
  remind: any;
  constructor(
    @Inject('action') private action,
    @Inject('nav') private navService,
    private dialog: MatDialog,
    private medicationRemindService: MedicationRemindService,
    private medicationRemindTableService: MedicationRemindTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.medicationRemindService.MedicationRemindConfig();
    this.medicationRemindTable = new TableOption({
      titles: this.medicationRemindTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.medicationRemindTable.queryKey = '';
    this.deleted = '';
    this.remind = '';
    this.page.subscribe((page: Array<number>) => {
      this.getmedicationRemind(page[0]);
    });
  }

  getmedicationRemind(page: number) {
    this.action.pageChange('medication',
      [page]);
    this.medicationRemindTable.reset(page);
    this.medicationRemindService.getData(page, this.medicationRemindTable.size, this.medicationRemindTable.queryKey, this.deleted, this.remind)
      .subscribe(
        res => {
          this.medicationRemindTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.medicationRemindTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.medicationRemindTable.totalPage = res.data.totalPages;
            res.data.content.forEach(obj => {
              if (obj.deleted == true) {
                obj.deleted = '已删除'
              } else {
                obj.deleted = ''
              }
              if (obj.remind == false) {
                obj.remind = '关闭'
              } else {
                obj.remind = '打开'
              }
            })
            this.medicationRemindTable.lists = res.data.content;
          } else {
            this.medicationRemindTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.medicationRemindTable.loading = false;
          console.log(err);
          this.medicationRemindTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
}
