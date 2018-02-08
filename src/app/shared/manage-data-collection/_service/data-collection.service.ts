import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

const PATH = {
  dataCollections: 'record/upload/list',
  dataCollection: 'record/upload',
  drug: 'BackstageMedicine/like'
};

@Injectable()
export class DataCollectionService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  dataCollectionConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '病史资料列表',
      ifHome: true,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection'
    })
  }

  dataCollectionDetailConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '病史资料详情',
      ifHome: false,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection/detail'
    })
  }

  dataCollectionEditConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '编辑病史资料',
      ifHome: false,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection/edit'
    })
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

  getDrugs(key) {
    return this.httpService.get(`${PATH.drug}?name=${key}`);
  }
}
