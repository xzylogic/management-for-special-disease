import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../_service/hospital.service';
import { ContainerConfig, HintDialog } from '../../../../libs';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { HospitalFormService } from '../../hospital/_service/hospital-form.service';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { Hospital } from '../_entity/hospital.entity';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html'
})
export class HospitalEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['hospital', 'data']) hospital: Observable<Hospital>;
  errMsg = '';
  form: any;
  hospitalId: number;

  constructor(
    private hospitalService: HospitalService,
    private hospitalFormService: HospitalFormService,
    private dialog: MdDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.hospital.subscribe(data => {
        this.hospitalId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.hospitalService.hospitalEditConfig(true);
          this.form = this.hospitalFormService.setHospitalForm();
        } else {
          this.containerConfig = this.hospitalService.hospitalEditConfig(false);
          this.form = this.hospitalFormService.setHospitalForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    console.log(value);
    if (this.hospitalId !== 0) {
      this.hospitalService.hospitalEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/hospital']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.hospitalService.hospitalCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/hospital']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    }
  }
}
