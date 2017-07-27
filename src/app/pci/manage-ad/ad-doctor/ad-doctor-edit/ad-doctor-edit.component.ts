import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AdDoctor } from '../_entity/ad-doctor.entity';
import { AdDoctorService } from '../_service/ad-doctor.service';
import { AdDoctorFormService } from '../_service/ad-doctor-form.service';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-ad-doctor-edit',
  templateUrl: './ad-doctor-edit.component.html'
})
export class AdDoctorEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['adDoctor', 'data']) adDoctor: Observable<AdDoctor>;
  errMsg = '';
  form: any;
  doctorId: number;

  constructor(
    private adDoctorService: AdDoctorService,
    private adDoctorFormService: AdDoctorFormService,
    private dialog: MdDialog,
    private router: Router,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    this.adDoctor.subscribe(data => {
        this.doctorId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.adDoctorService.adDoctorEditConfig(true);
          this.form = this.adDoctorFormService.setAdDoctorForm();
        } else {
          this.containerConfig = this.adDoctorService.adDoctorEditConfig(false);
          this.form = this.adDoctorFormService.setAdDoctorForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.doctorId !== 0) {
      value['type'] = 1;
      value['admin'] = this.auth.getAdminName();
      this.adDoctorService.adEdit(this.doctorId, value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-doctor']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      value['type'] = 1;
      value['admin'] = this.auth.getAdminName();
      this.adDoctorService.adNew(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-doctor']);
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
