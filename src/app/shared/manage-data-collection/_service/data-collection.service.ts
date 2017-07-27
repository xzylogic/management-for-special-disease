import { Injectable, Inject } from '@angular/core';

const PATH = {
  dataCollections: 'record/upload/list',
  dataCollection: 'record/upload'
};

@Injectable()
export class DataCollectionService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  getDataCollections(page, size, type) {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.dataCollections}?page=${page}&size=${size}&type=${type}`);
  }

  getDataCollection(id) {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.dataCollection}/${id}`);
  }

  dataCollectionCreate(id, data) {
    return this.httpService.post(`${this.app.pci.COMMON_URL}${PATH.dataCollection}/${id}`, data);
  }

  statusChanged(id, data) {
    return this.httpService.put(`${this.app.pci.COMMON_URL}${PATH.dataCollection}/${id}`, data);
  }
}
