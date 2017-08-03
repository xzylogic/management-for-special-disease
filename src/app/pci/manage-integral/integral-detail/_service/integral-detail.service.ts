import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs';

const PATH = {
  integralDetailList: 'opt/integral/records/listByParam', // 查询选项列表
}

@Injectable()
export class IntegralDetailService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  integralDetailConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '积分管理',
      subTitle: '积分明细',
      ifHome: true,
      homeRouter: '/integral-detail',
      currentRouter: '/integral-detail'
    });
  }

  /**
   * 获取积分明细列表
   */
  getIntegralDetail(obj: {type: number, param ?: string, flag ?: number}) {
    if (obj.param && !obj.flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}?param=${obj.param}`);
    } else if (!obj.param && obj.flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}?flag=${obj.flag}`);
    } else if (obj.param && obj.flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}?param=${obj.param}&flag=${obj.flag}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}`);
    }
  }
}


