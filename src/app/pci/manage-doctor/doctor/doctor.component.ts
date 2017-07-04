import { Component, OnInit } from '@angular/core';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorService } from './_service/doctor.service';
import { DoctorTableService } from './_service/doctor-table.service';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ERRMSG } from '../../_store/static';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [`
    .content {
      position: relative;
    }

    .count {
      position: absolute;
      top: 10px;
      left: 270px;
    }

    .count > md-chip {
      padding: 4px 5px;
      font-size: 12px;
    }

    @media (max-width: 600px) {
      .count {
        left: 138px;
      }
    }
  `]
})
export class DoctorComponent implements OnInit {
  containerConfig: ContainerConfig;
  auditedTable: TableOption;
  auditingTable: TableOption;
  failureTable: TableOption;
  tab: Observable<number>;

  constructor(
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private router: Router
  ) {
    this.containerConfig = doctorService.doctorConfig();
    console.log(this.containerConfig);
    this.tab = doctorService.getTab();
    console.log(this.tab);
    this.auditedTable = new TableOption({
      titles: doctorTableService.setDoctorAuditedTitles(),
      ifPage: true
    });
    this.auditingTable = new TableOption({
      titles: doctorTableService.setDoctorAuditingTitles(),
      ifPage: true
    });
    this.failureTable = new TableOption({
      titles: doctorTableService.setDoctorFailureTitles(),
      ifPage: true
    });
  }

  ngOnInit() {
    this.reset0();
    this.reset1();
    this.reset2();
  }

  reset0() {
    this.auditedTable.queryKey = '';
    this.getAuditedDoctors(0);
  }

  reset1() {
    this.auditingTable.queryKey = '';
    this.getAuditingDoctors(0);
  }

  reset2() {
    this.failureTable.queryKey = '';
    this.getFailureDoctors(0);
  }

  getAuditedDoctors(page: number) {
    this.auditedTable.reset(page);
    this.doctorService.getAuditedDoctors(
      this.auditedTable.queryKey, page, this.auditedTable.size)
      .subscribe(res => {
        this.auditedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.auditedTable.totalPage = res.data.totalPages;
          this.auditedTable.lists = res.data.content;
        } else {
          this.auditedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.auditedTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getAuditingDoctors(page: number) {
    this.auditingTable.reset(page);
    this.doctorService.getAuditingDoctors(
      this.auditingTable.queryKey, page, this.auditingTable.size)
      .subscribe(res => {
        this.auditingTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.auditingTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.auditingTable.totalPage = res.data.totalPages;
          this.auditingTable.lists = res.data.content;
        } else {
          this.auditingTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.auditingTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getFailureDoctors(page: number) {
    this.failureTable.reset(page);
    this.doctorService.getAuditedDoctors(
      this.failureTable.queryKey, page, this.failureTable.size)
      .subscribe(res => {
        this.failureTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.failureTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.failureTable.totalPage = res.data.totalPages;
          this.failureTable.lists = res.data.content;
        } else {
          this.failureTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.failureTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  gotoHandle(res) {
    console.log(res);
    this.router.navigate(['/doctor/edit']);
  }

  change(index) {
    this.doctorService.setTab(index);
  }

}

@Component({
  selector: 'app-doctor-outlet',
  template: `
    <router-outlet></router-outlet>
  `
})
export class DoctorOutletComponent {
}
