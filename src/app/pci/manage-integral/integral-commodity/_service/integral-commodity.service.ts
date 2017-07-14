import { Inject, Injectable } from '@angular/core';

const PATH = {
  integralCommodityList: 'opt/integral/goods/list', // 积分商品维护列表
  integralCommodityEdit: 'opt/integral/goods/update', // 新增更新商品
  integralCommodityStatus: 'opt/integral/goods/updateStatus', // 更新商品状态
};

@Injectable()
export class IntegralCommodityService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取积分商品维护列表
   * @param {number} flag   [description]
   */
  getIntegralCommodity(flag: number) {
    if (flag) {
      return this.httpService.get(`${PATH.integralCommodityList}?flag=${flag}`);
    } else {
      return this.httpService.get(`${PATH.integralCommodityList}`);
    }
  }

  /**
   * 新增更新商品
   */
  integralCommodityUpdate(body: any) {
    return this.httpService.post(`${PATH.integralCommodityEdit}`, body);
  }

  /**
   * 更新商品状态
   */
  updateIntegralStatus(goodsId: number, idx: number) {
    return this.httpService.get(`${PATH.integralCommodityStatus}/${goodsId}/${idx}`);
  }
}
