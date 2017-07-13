import { Inject, Injectable } from '@angular/core';

const PATH = {
  getServiceSpec: 'opt/specifications/list',
  updateServiceSpec: 'opt/specifications/update',
  searchSpecName: 'opt/specifications/listSpecificationName',
  searchThird: 'opt/specifications/listServiceName'
};

@Injectable()
export class ServiceSpecService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  getServiceSpec(page, size) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.getServiceSpec}?page=${page}&size=${size}`);
  }

  serviceSpecUpdate(body) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.updateServiceSpec}`, body);
  }

  searchSpecName(param) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.searchSpecName}/${param}`);
  }

  searchThird(param) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.searchThird}/${param}`);
  }
}
