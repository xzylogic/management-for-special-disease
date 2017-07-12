import { Injectable } from '@angular/core';

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class BusinessStatisticsService {

  constructor(private _apiService: ApiService) {
  }

  getData(option: { startTime: string, endTime: string }) {
    return this._apiService.get(`${PATH.businessData}?start=${option.startTime}&end=${option.endTime}`);
  }

}
