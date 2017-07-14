import { Injectable, Inject } from '@angular/core';

const PATH = {
  integralOrderList: 'opt/integral/exchanges/list', // 积分商品订单列表
  integralExpressList: 'opt/courier/companys/list', // 快递列表
  integralExpressEdit: 'opt/integral/exchanges/updateCourier', // 编辑单号
  integralOrderCount: 'opt/integral/exchanges/countProcess', // 积分订单商品数量
};

@Injectable()
export class IntegralOrderService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 积分商品订单列表
   */
  getIntegralOrder(obj: { idx?: number, flag?: number }) {
    if (obj.idx && !obj.flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}?idx=${obj.idx}`);
    } else if (!obj.idx && obj.flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}?flag=${obj.flag}`);
    } else if (!obj.idx && !obj.flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}?idx=${obj.idx}&flag=${obj.flag}`);
    }
  }

  /**
   * 积分订单商品数量
   */
  getIntegralOrderCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderCount}`);
  }

  /**
   * 快递列表
   */
  getExpressList() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralExpressList}`);
  }

  /**
   * 编辑单号
   */
  editExpressNo(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.integralExpressEdit}`, body);

  }
}
