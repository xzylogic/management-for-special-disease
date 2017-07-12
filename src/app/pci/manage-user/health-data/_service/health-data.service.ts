import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class HealthDataService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取患者列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   * @param {string} standard   [患者体征项目状态，0正常，1异常]
   */
  getData(page: number, param: string, standard: string) {
    return this._apiService.get(`${PATH.healthData}?page=${page}&&standard=${standard}&&param=${param}`);
  }

}
