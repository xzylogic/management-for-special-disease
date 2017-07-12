import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class fatherStatisticsService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取父亲节分享量统计
   */
  getfather(start: number, end: number) {
    return this._apiService.get(`${PATH.fatherStatistics}?start=${start}&end=${end}`);
  }

}
