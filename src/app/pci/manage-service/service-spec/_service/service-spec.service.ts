import { Injectable } from '@angular/core';
import { ApiService } from "../../../_services/api";

const PATH = {
  getServiceSpec: 'opt/specifications/list',
  updateServiceSpec: 'opt/specifications/update',
  searchSpecName: 'opt/specifications/listSpecificationName',
  searchThird: 'opt/specifications/listServiceName'
};

@Injectable()
export class ServiceSpecService {

  constructor(private _apiService: ApiService) {
  }

  getServiceSpec(page, size) {
    return this._apiService.get(`${PATH.getServiceSpec}?page=${page}&size=${size}`);
  }

  serviceSpecUpdate(body) {
    return this._apiService.post(`${PATH.updateServiceSpec}`, body);
  }

  searchSpecName(param) {
    return this._apiService.get(`${PATH.searchSpecName}/${param}`);
  }

  searchThird(param) {
    return this._apiService.get(`${PATH.searchThird}/${param}`);
  }

}
