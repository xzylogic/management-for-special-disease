import { Component, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DoctorService } from '../_service/doctor.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Doctor } from '../_store/doctor.state';
import { DoctorFormService } from '../_service/doctor-form.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html'
})
export class DoctorEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['doctor', 'doctor']) doctor: Observable<Doctor>;
  form: any;

  constructor(
    private doctorService: DoctorService,
    private doctorFormService: DoctorFormService
  ) {
  }

  ngOnInit() {
    this.doctor.subscribe(data => {
      if (data.id === 0) {
        this.containerConfig = this.doctorService.doctorEditConfig(true);
        this.form = this.doctorFormService.setForm([], [], []);
      } else {
        this.containerConfig = this.doctorService.doctorEditConfig(false);
        this.form = this.doctorFormService.setForm([], [], [], data);
      }
    });
    console.log(this.form);
  }

  getValues(value) {
    console.log(value);
  }
}
