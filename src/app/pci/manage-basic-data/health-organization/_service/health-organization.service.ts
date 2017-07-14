import { Inject, Injectable } from '@angular/core';

const PATH = {
  thirdPartyList: 'api/healthorganization/all', // 第三方机构列表
  thirdPartyCreate: 'api/healthorganization/edit', // 新增机构信息
  thirdPartyEdit: 'api/healthorganization/edit', // 编辑机构信息
};

@Injectable()
export class HealthOrganizationService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
  ) {
  }

  /**
   * 获取第三方机构列表
   */
  getHealthOrganizations() {
    return this.httpService.get(`${PATH.thirdPartyList}`);
  }

  /**
   * 新建第三方机构
   * @param {[type]} data [description]
   */
  healthOrganizationCreate(data) {
    return this.httpService.post(`${PATH.thirdPartyCreate}`, data);
  }

  /**
   * 编辑第三方机构
   * @param {[type]} data [description]
   */
  healthOrganizationEdit(data) {
    return this.httpService.post(`${PATH.thirdPartyEdit}`, data);
  }
}
