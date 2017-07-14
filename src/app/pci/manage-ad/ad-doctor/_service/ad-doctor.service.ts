import { Injectable, Inject } from '@angular/core';

const PATH = {
  adList: 'api/banner', // GET
  adNew: 'api/banner', // POST
  adDelete: 'api/banner', // DELETE
  adEdit: 'api/banner', // PUT
  adStatus: 'api/banner', // PUT, /api/banner/{id}/status
};

@Injectable()
export class AdDoctorService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取广告列表
   */
  getAdList(page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.adList}?type=1&size=10&page=${page}`);
  }

  /**
   * 新增广告
   */
  adNew(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.adNew}`, data);
  }

  /**
   * 编辑广告
   */
  adEdit(id, data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.adEdit}/${id}`, data);
  }

  /**
   * 删除广告
   */
  adDelete(id) {
    return this.httpService.del(`${this.app.pci.BASE_URL}${PATH.adDelete}/${id}`);
  }

  /**
   * 广告上下架
   */
  adStatus(id) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.adStatus}/${id}/status`, {});
  }
}
