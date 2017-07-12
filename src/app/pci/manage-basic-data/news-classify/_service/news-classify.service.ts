import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class NewsClassifyService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取通过审核的医生列表
   */
  getNewsClassifies() {
    return this._apiService.get(`${PATH.healthInfoList}`);
  }

  /**
   * 新建健康资讯分类
   */
  newsClassifyCreate(data) {
    return this._apiService.postParma(`${PATH.healthInfoCreate}?name=${data}`);
  }

  /**
   * 编辑健康资讯分类
   */
  newsClassifyUpdate(id, data) {
    return this._apiService.postParma(`${PATH.healthInfoUpdate}?id=${id}&name=${data}`);
  }

}
