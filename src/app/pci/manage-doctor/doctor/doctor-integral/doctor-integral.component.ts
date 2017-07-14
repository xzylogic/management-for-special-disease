import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContainerConfig } from '../../../../libs';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorService } from '../_service/doctor.service';
import { DoctorTableService } from '../_service/doctor-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-integral',
  templateUrl: './doctor-integral.component.html'
})
export class DoctorIntegralComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorIntegralTable: TableOption;

  id: number;

  constructor(
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorIntegralConfig();
    this.doctorIntegralTable = new TableOption({
      titles: this.doctorTableService.setIntegralTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      console.log(params);
      this.id = +params['id'];
      this.getIntegralDetail(this.id, 0);
    })
  }

  getIntegralDetail(id, page) {
    this.doctorIntegralTable.reset(page);
    this.doctorService.doctorIntegralDetail(id, page)
      .subscribe(res => {
        console.log(res);
        this.doctorIntegralTable.loading = false;
        if (res.code === 0 && res.data.content) {
          this.doctorIntegralTable.totalPage = res.data.totalPages;
          this.doctorIntegralTable.lists = res.data.content;
        } else {
          this.doctorIntegralTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.doctorIntegralTable.errorMessage = ERRMSG.netErrMsg;
      })
  }
}
