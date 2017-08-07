import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs';

const PATH = {
  integralDetailList: 'opt/integral/records/listByParam', // 查询选项列表
  PresentExp: 'opt/integral/records/grant', // 积分赠送
  getIntegralRule: 'opt/integral/records/getRule', // 获取积分规则
  integralRuleEdit: 'opt/integral/records/rule', // 编辑积分规则
};

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
      homeRouter: '/integralDetail',
      currentRouter: '/integralDetail'
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

  /**
   * 获取积分规则
   */
  getIntegralRule() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getIntegralRule}`);
  }

  /**
   * 积分规则修改
   * @param {any} body [description]
   */
  integralRuleUpdate(id: number, rule: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.integralRuleEdit}?id=${id}&rule=${rule}`);
  }

  /**
   * 积分赠送
   * @param {any} body [description]
   */
  PresentExp(body: any ) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.PresentExp}`, body);
  }
}


