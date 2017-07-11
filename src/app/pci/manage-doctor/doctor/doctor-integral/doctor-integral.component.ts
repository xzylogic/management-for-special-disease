import { Component, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { DoctorService } from '../_service/doctor.service';

@Component({
  selector: 'app-doctor-integral',
  templateUrl: './doctor-integral.component.html'
})
export class DoctorIntegralComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorIntegralConfig();
  }
}
