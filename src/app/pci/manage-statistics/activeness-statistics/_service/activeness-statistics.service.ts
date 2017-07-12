import { Injectable } from '@angular/core';

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class ActivenessStatisticsService {

  constructor(private _apiService: ApiService) {
  }

  getUserActiveness(obj: { page: number, size: number, key ?: string, date ?: string }) {
    if (obj.date && !obj.key) {
      return this._apiService.get(`${PATH.userActivenessStatistics}?date=${obj.date}&page=${obj.page}&size=${obj.size}`);
    } else if (!obj.date && obj.key) {
      return this._apiService.get(`${PATH.userActivenessStatistics}?key=${obj.key}&page=${obj.page}&size=${obj.size}`);
    } else if (obj.date && obj.key) {
      return this._apiService.get(`${PATH.userActivenessStatistics}?key=${obj.key}&date=${obj.date}&page=${obj.page}&size=${obj.size}`);
    } else {
      return this._apiService.get(`${PATH.userActivenessStatistics}?page=${obj.page}&size=${obj.size}`);
    }
  }

  getDoctorActiveness(obj: { page: number, size: number, key ?: string, date ?: string }) {
    if (obj.date && !obj.key) {
      return this._apiService.get(`${PATH.doctorActivenessStatistics}?date=${obj.date}&page=${obj.page}&size=${obj.size}`);
    } else if (!obj.date && obj.key) {
      return this._apiService.get(`${PATH.doctorActivenessStatistics}?key=${obj.key}&page=${obj.page}&size=${obj.size}`);
    } else if (obj.date && obj.key) {
      return this._apiService.get(`${PATH.doctorActivenessStatistics}?key=${obj.key}&date=${obj.date}&page=${obj.page}&size=${obj.size}`);
    } else {
      return this._apiService.get(`${PATH.doctorActivenessStatistics}?page=${obj.page}&size=${obj.size}`);
    }
  }

}
