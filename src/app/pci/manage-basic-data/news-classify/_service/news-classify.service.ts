import { Inject, Injectable } from '@angular/core';

const PATH = {
  healthInfoUpdate: 'api/articleType/update', // 修改资讯分类
  healthInfoDelete: 'api/articleType/delete', // 删除资讯分类
  healthInfoCreate: 'api/articleType/save', // 新增资讯分类
  healthInfoList: 'api/articleType/list', // 获取所有资讯分类
};

@Injectable()
export class NewsClassifyService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取通过审核的医生列表
   */
  getNewsClassifies() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthInfoList}`);
  }

  /**
   * 新建健康资讯分类
   */
  newsClassifyCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.healthInfoCreate}?name=${data}`, {});
  }

  /**
   * 编辑健康资讯分类
   */
  newsClassifyUpdate(id, data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.healthInfoUpdate}?id=${id}&name=${data}`, {});
  }
}
