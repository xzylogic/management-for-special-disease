import { Component, OnInit } from '@angular/core';

import { ContainerConfig } from '../../../../libs';
import { DoctorService } from '../_service/doctor.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html'
})
export class SendMessageComponent implements OnInit {
  containerConfig: ContainerConfig;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorMessageConfig();
  }
}
