import { Inject, Injectable } from '@angular/core';

const PATH = {
  commodityCreate: 'api/goods/add', // 新增商品
  commodityUpdate: 'api/goods/update', // 编辑商品
  commodityStatus: 'api/goods/update/status', // 上下架删除商品
  commodityList: 'api/goods/all', // 查询商品列表
};

@Injectable()
export class CommodityService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取通过审核的医生列表
   */
  getCommodities() {
    return this.httpService.get(`${PATH.commodityList}`);
  }

  /**
   * 新增商品
   * @param {[type]} body [description]
   */
  commodityCreate(body) {
    return this.httpService.post(`${PATH.commodityCreate}`, body);
  }

  /**
   * 编辑商品
   * @param {[type]} body [description]
   */
  commodityUpdate(body) {
    return this.httpService.post(`${PATH.commodityUpdate}`, body);
  }

  /**
   * 上架/下架/删除商品
   * @param {number} id     [description]
   * @param {number} status [description]
   */
  commodityStatus(id: number, status: number) {
    return this.httpService.get(`${PATH.commodityStatus}?id=${id}&status=${status}`);
  }
}
