import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../_service/doctor.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

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
