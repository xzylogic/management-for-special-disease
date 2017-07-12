import { Injectable } from "@angular/core";

import { PATH } from '../../_services/api-url';
import { ApiService } from "../../_services/api";

@Injectable()
export class CommodityService {

  constructor(private _apiService: ApiService) {}

  /**
   * 获取通过审核的医生列表
   */
  getCommodities() {
    return this._apiService.get(`${PATH.commodityList}`);
  }

  /**
   * 新增商品
   * @param {[type]} body [description]
   */
  commodityCreate(body) {
    return this._apiService.post(`${PATH.commodityCreate}`, body);
  }

  /**
   * 编辑商品
   * @param {[type]} body [description]
   */
  commodityUpdate(body) {
    return this._apiService.post(`${PATH.commodityUpdate}`, body);
  }

  /**
   * 上架/下架/删除商品
   * @param {number} id     [description]
   * @param {number} status [description]
   */
  commodityStatus(id: number, status: number) {
    return this._apiService.get(`${PATH.commodityStatus}?id=${id}&status=${status}`);
  }

}
