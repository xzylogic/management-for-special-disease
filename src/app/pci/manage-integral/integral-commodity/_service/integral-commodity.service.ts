import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class IntegralCommodityService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取积分商品维护列表
   * @param {number} flag   [description]
   */
  getIntegralCommodity(flag: number) {
    if (flag) {
      return this._apiService.get(`${PATH.integralCommodityList}?flag=${flag}`);
    } else {
      return this._apiService.get(`${PATH.integralCommodityList}`);
    }
  }

  /**
   * 新增更新商品
   */
  integralCommodityUpdate(body: any) {
    return this._apiService.post(`${PATH.integralCommodityEdit}`, body);
  }

  /**
   * 更新商品状态
   */
  updateIntegralStatus(goodsId: number, idx: number) {
    return this._apiService.get(`${PATH.integralCommodityStatus}/${goodsId}/${idx}`);
  }

}
