import { Component, Inject, OnInit } from '@angular/core';
import { PackageServiceService } from '../_service/package-service.service';
import { PackageServiceFormService } from '../_service/package-service-form.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PackageService } from '../_entity/package-service.entity';
import { ERRMSG } from '../../../_store/static';
import { HintDialog } from '../../../../libs/dmodal/dialog/dialog.component';

@Component({
  selector: 'app-package-service-edit',
  templateUrl: './package-service-edit.component.html',
})
export class PackageServiceEditComponent implements OnInit {

  containerConfig: ContainerConfig;
  @select(['packageService', 'data']) packageService: Observable<PackageService>;
  errMsg = '';
  form: any;
  packageServiceId: number;

  constructor(
    private packageServiceService: PackageServiceService,
    private packageServiceFormService: PackageServiceFormService,
    private dialog: MdDialog,
    private router: Router,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    // this.packageService.subscribe(res => {
        this.packageServiceService.getServiceOptionD().subscribe(data => {
          console.log(data);
          // this.packageServiceService.getServiceOptionT().subscribe(obj => {
          //     this.packageServiceId = res.id;
          //     if (res.id === 0) {
          //       this.containerConfig = this.packageServiceService.packageServiceEditConfig(true);
          //       this.form = this.packageServiceFormService.setForm(data.doctorPackages, obj.thirdPackages);
          //     } else {
          //       this.containerConfig = this.packageServiceService.packageServiceEditConfig(false);
          //       this.form = this.packageServiceFormService.setForm(data.doctorPackages, obj.thirdPackages, data);
          //     }
          //   }
          // );
        });
      // },
      // err => {
      //   console.log(err);
      //   this.errMsg = ERRMSG.netErrMsg;
      // });
  }

  getValues(value) {
    this.packageServiceService.packageServiceSave(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/package-service']);
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
