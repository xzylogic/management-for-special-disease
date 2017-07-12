import { Injectable } from '@angular/core';

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class PeriodStatisticsService {

  constructor(private _apiService: ApiService) {
  }

  getUserResult(option: { startTime: string, endTime: string }) {
    return this._apiService.get(`${PATH.userPeriodStatistics}?startTime=${option.startTime}&endTime=${option.endTime}`);
  }

  getDoctorResult(option: { startTime: string, endTime: string }) {
    return this._apiService.get(`${PATH.doctorPeriodStatistics}?startTime=${option.startTime}&endTime=${option.endTime}`);
  }

}
