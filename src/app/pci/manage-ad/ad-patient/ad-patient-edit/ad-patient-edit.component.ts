import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog/dialog.component';
import { AdPatient } from '../_entity/ad-patient.entity';
import { AdPatientService } from '../_service/ad-patient.service';
import { AdPatientFormService } from '../_service/ad-patient-form.service';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-patient-edit',
  templateUrl: './ad-patient-edit.component.html'
})
export class AdPatientEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['adPatient', 'data']) adPatient: Observable<AdPatient>;
  errMsg = '';
  form: any;
  patientId: number;

  constructor(
    private adPatientService: AdPatientService,
    private adPatientFormService: AdPatientFormService,
    private dialog: MdDialog,
    private router: Router,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    this.adPatient.subscribe(data => {
      this.patientId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.adPatientService.adPatientEditConfig(true);
          this.form = this.adPatientFormService.setAdPatientForm();
        } else {
          this.containerConfig = this.adPatientService.adPatientEditConfig(false);
          this.form = this.adPatientFormService.setAdPatientForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  getValues(value) {
    if (this.patientId !== 0) {
      value['type'] = 0;
      value['admin'] = this.auth.getAdminName();
      this.adPatientService.adEdit(this.patientId, value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-patient']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      value['type'] = 0;
      value['admin'] = this.auth.getAdminName();
      this.adPatientService.adNew(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-patient']);
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
