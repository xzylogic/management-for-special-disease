import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class PackageServiceService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * [getPackageServices description]
   */
  getPackageServices() {
    return this._apiService.get(`${PATH.packageServiceList}`);
  }

  /**
   * [packageServiceSave description]
   * @param {[type]} body [description]
   */
  packageServiceSave(body) {
    return this._apiService.post(`${PATH.packageServiceSave}`, body);
  }

  /**
   * [getServiceOptionD description]
   */
  getServiceOptionD() {
    return this._apiService.get(`${PATH.serviceOptionDList}`);
  }

  /**
   * [getServiceOptionT description]
   */
  getServiceOptionT() {
    return this._apiService.get(`${PATH.serviceOptionTList}`);
  }

}
