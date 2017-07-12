import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class HealthOrganizationService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取第三方机构列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getHealthOrganizations() {
    return this._apiService.get(`${PATH.thirdPartyList}`);
  }

  /**
   * 新建第三方机构
   * @param {[type]} body [description]
   */
  healthOrganizationCreate(data) {
    return this._apiService.post(`${PATH.thirdPartyCreate}`, data);
  }

  /**
   * 编辑第三方机构
   * @param {[type]} body [description]
   */
  healthOrganizationEdit(data) {
    return this._apiService.post(`${PATH.thirdPartyEdit}`, data);
  }

}
