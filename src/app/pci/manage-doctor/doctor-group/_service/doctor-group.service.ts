import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class DoctorGroupService {

  constructor(private _apiService: ApiService) {}

  /**
   * [getDoctorGroups description]
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getDoctorGroups(page: number, size: number) {
    return this._apiService.get(`${PATH.doctorGroupList}?page=${page}&size=${size}`);
  }

  /**
   * [getAuditingServices description]
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getAuditingServices(page: number, size: number) {
    return this._apiService.get(`${PATH.auditingServiceList}?page=${page}&size=${size}`);
  }

  /**
   * [getServiceDetails description]
   * @param {number} id   [description]
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getServiceDetails(id: number, page: number, size: number) {
    return this._apiService.get(`${PATH.doctorGroupOrderDetail}?dgid=${id}&page=${page}&size=${size}`);
  }

  /**
   * [doctorGroupUpdateDesc description]
   * @param {number} id   [description]
   * @param {string} desc [description]
   */
  doctorGroupUpdateDesc(id: number, desc: string) {
    return this._apiService.postParma(`${PATH.doctorGroupUpdateDesc}?dgid=${id}&desc=${desc}`)
  }

  /**
   * [getAuditingServiceCount description]
   */
  getAuditingServiceCount() {
    return this._apiService.get(`${PATH.doctorGroupCountAuditing}`)
  }

  /**
   * [serviceAuditingSuccess description]
   * @param {number} id [description]
   */
  serviceAuditingSuccess(id: number) {
    return this._apiService.postParma(`${PATH.auditingServiceSuccess}?pid=${id}&index=1`);
  }

}
