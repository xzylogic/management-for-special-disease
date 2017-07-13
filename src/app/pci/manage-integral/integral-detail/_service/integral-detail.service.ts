import { Inject, Injectable } from '@angular/core';

const PATH = {
  integralDetailList: 'opt/integral/records/listByParam', // 积分明细列表
}

@Injectable()
export class IntegralDetailService {
  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取积分明细列表
   */
  getIntegralDetail(obj: { type: number, param?: string, flag?: number }) {
    if (obj.param && !obj.flag) {
      return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}?param=${obj.param}`);
    } else if (!obj.param && obj.flag) {
      return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}?flag=${obj.flag}`);
    } else if (obj.param && obj.flag) {
      return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}?param=${obj.param}&flag=${obj.flag}`);
    } else {
      return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.integralDetailList}/${obj.type}`);
    }
  }
}
