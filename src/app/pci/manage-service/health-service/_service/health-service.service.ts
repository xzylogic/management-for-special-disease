import { Inject, Injectable } from '@angular/core';

const PATH = {
  healthServiceList: 'api/healthService/list', // 查询第三方服务列表
  healthServiceDetail: 'api/healthService/detail', // 查询第三方服务详情
  healthServiceCreate: 'api/healthService/save', // 新增第三方服务
  healthServiceUpdate: 'api/healthService/update', // 修改第三方服务
  serviceSpecificationList: 'api/healthServiceSpecification/list', // 查询服务规格列表
  serviceSpecificationCreate: 'api/healthServiceSpecification/save', // 新增服务规格
  serviceSpecificationUpdate: 'api/healthServiceSpecification/update', // 修改服务规格
  thirdPartyList: 'api/healthorganization/all', // 第三方机构列表
};

@Injectable()
export class HealthServiceService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  getHealthServices(page: number, size: number) {
    return this.httpService.get(`${PATH.healthServiceList}?page=${page}&size=${size}`);
  }

  getHealthService(id: number) {
    return this.httpService.get(`${PATH.healthServiceDetail}/${id}`);
  }

  healthServiceCreate(body) {
    return this.httpService.post(`${PATH.healthServiceCreate}`, body);
  }

  healthServiceUpdate(body) {
    return this.httpService.post(`${PATH.healthServiceUpdate}`, body);
  }

  getSpecifications(id: number, page: number, size: number) {
    return this.httpService.get(`${PATH.serviceSpecificationList}?serviceId=${id}&page=${page}&size=${size}`);
  }

  specifitionCreate(id: number, body) {
    return this.httpService.post(`${PATH.serviceSpecificationCreate}/${id}`, body);
  }

  specifitionUpdate(id: number, body) {
    return this.httpService.post(`${PATH.serviceSpecificationUpdate}/${id}`, body);
  }

  getOrganization() {
    return this.httpService.get(`${PATH.thirdPartyList}`);
  }
}
