import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

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

  basicServiceConfig() {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: '基础服务维护',
      ifHome: true,
      homeRouter: '/basic-service',
      currentRouter: '/basic-service'
    });
  }

  basicServiceEditConfig(flag) {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: flag ? '编辑基础服务' : '新增基础服务',
      ifHome: true,
      homeRouter: '/basic-service',
      currentRouter: '/basic-service/edit'
    });
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
