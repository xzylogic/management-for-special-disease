import { Injectable } from '@angular/core';
import { ApiService } from "../../../_services/api";

const PATH = {
  downloadStatistics: 'api/operational/pv'
};

@Injectable()
export class DownloadStatisticsService {

  constructor(private _apiService: ApiService) {
  }

  getDownloadStatistics(start, end, flag) {
    return this._apiService.get(
      `${PATH.downloadStatistics}?startTime=${start}&endTime=${end}&product=${flag}`
    );
  }

}
