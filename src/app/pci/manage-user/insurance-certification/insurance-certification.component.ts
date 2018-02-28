import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
// import { ImageDialog } from '../../../libs/dmodal/dialog-img.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { InsuranceCertificationService } from './_service/insurance-certification.service';
import { InsuranceCertificationTableService } from './_service/insurance-certification-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-insurance-certification',
  templateUrl: './insurance-certification.component.html'
})
export class InsuranceCertificationComponent implements OnInit {

  containerConfig: ContainerConfig;
  insuranceCertificationTable: TableOption;

  @select(['insuranceCertification', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('nav') private navService,
    private insuranceCertificationService: InsuranceCertificationService,
    private insuranceCertificationTableService: InsuranceCertificationTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.insuranceCertificationService.InsuranceCertificationConfig();
    this.insuranceCertificationTable = new TableOption({
      titles: this.insuranceCertificationTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.insuranceCertificationTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getInsuranceList(page[0]);
    });
  }

  getInsuranceList(page: number) {
    this.action.pageChange('medication',
      [page]);
    this.insuranceCertificationTable.reset(page);
    this.insuranceCertificationService.getData(page, this.insuranceCertificationTable.size, this.insuranceCertificationTable.queryKey)
      .subscribe(
        res => {
          this.insuranceCertificationTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.insuranceCertificationTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.insuranceCertificationTable.totalPage = res.data.totalPages;
            res.data.content.forEach(obj => {
              if (obj.sex == 0) {
                obj.sex = '男'
              } else {
                obj.sex = '女'
              }
            })
            this.insuranceCertificationTable.lists = res.data.content;
          } else {
            this.insuranceCertificationTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.insuranceCertificationTable.loading = false;
          console.log(err);
          this.insuranceCertificationTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  // gotoHandle(res) {
  //   if (res.key === 'idCardImageUrl') {
  //     ImageDialog(res.value.name, res.value.idCardImageUrl, this.dialog);
  //   }
  // }

}
