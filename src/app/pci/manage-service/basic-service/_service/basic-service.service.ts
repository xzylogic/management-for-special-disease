import { Inject, Injectable } from '@angular/core';

const PATH = {
  basicServiceList: 'opt/servicePackages/list', // 医生小组服务包列表
  basicServiceUpdate: 'opt/servicePackages/modify', // 医生小组服务包修改
};

@Injectable()
export class BasicServiceService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取基础服务列表
   */
  getBasicServices() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.basicServiceList}`);
  }

  /**
   * 更新基础服务
   * @param {any} body [description]
   */
  basicServiceUpdate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.basicServiceUpdate}`, body);
  }
}
