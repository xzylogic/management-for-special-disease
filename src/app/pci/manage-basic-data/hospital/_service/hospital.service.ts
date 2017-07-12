import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class HospitalService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取医院列表
   */
  getHospitals() {
    return this._apiService.get(`${PATH.hospitalList}`);
  }

  /**
   * 新建医院
   */
  hospitalCreate(data) {
    return this._apiService.post(`${PATH.hospitalCreate}`, data);
  }

  /**
   * 编辑医院
   */
  hospitalEdit(data) {
    return this._apiService.post(`${PATH.hospitalEdit}`, data);
  }

}
