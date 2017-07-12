import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class BasicServiceService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取基础服务列表
   */
  getBasicServices() {
    return this._apiService.get(`${PATH.basicServiceList}`);
  }

  /**
   * 更新基础服务
   * @param {any} body [description]
   */
  basicServiceUpdate(body: any) {
    return this._apiService.post(`${PATH.basicServiceUpdate}`, body);
  }

}
