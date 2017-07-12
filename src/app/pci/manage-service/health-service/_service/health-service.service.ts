import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class HealthServiceService {

  constructor(private _apiService: ApiService) {}

  getHealthServices(page: number, size: number) {
    return this._apiService.get(`${PATH.healthServiceList}?page=${page}&size=${size}`);
  }

  getHealthService(id: number) {
    return this._apiService.get(`${PATH.healthServiceDetail}/${id}`);
  }

  healthServiceCreate(body) {
    return this._apiService.post(`${PATH.healthServiceCreate}`, body);
  }

  healthServiceUpdate(body) {
    return this._apiService.post(`${PATH.healthServiceUpdate}`, body);
  }

  getSpecifications(id: number, page: number, size: number) {
    return this._apiService.get(`${PATH.serviceSpecificationList}?serviceId=${id}&page=${page}&size=${size}`);
  }

  specifitionCreate(id: number, body) {
    return this._apiService.post(`${PATH.serviceSpecificationCreate}/${id}`, body);
  }

  specifitionUpdate(id: number, body) {
    return this._apiService.post(`${PATH.serviceSpecificationUpdate}/${id}`, body);
  }

  getOrganization(){
    return this._apiService.get(`${PATH.thirdPartyList}`);
  }

}
