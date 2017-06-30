import { Component, OnInit } from '@angular/core';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorService } from './_service/doctor.service';
import { DoctorTableService } from './_service/doctor-table.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {
  auditedTable: TableOption;

  constructor(
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService
  ) {
    this.auditedTable = new TableOption({
      titles: doctorTableService.setDoctorAuditedTitles(),
      ifPage: true
    });
  }

  ngOnInit() {
    this.getAuditedDoctors(0);
  }

  getAuditedDoctors(page: number) {
    this.auditedTable.reset(page);
    this.doctorService.getAuditedDoctors(this.auditedTable.queryKey, page, this.auditedTable.size)
      .subscribe(res => {
        this.auditedTable.loading = false;
        if (res.data && res.data.content) {
          this.auditedTable.totalPage = res.data.totalPages;
          this.auditedTable.lists = res.data.content;
        }
      })
  }

}
