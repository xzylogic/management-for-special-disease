import { Injectable } from "@angular/core";

import { PATH } from '../../../_services/api-url';
import { ApiService } from "../../../_services/api";

@Injectable()
export class FollowUpPlanService {

  constructor(private _apiService: ApiService) {
  }

  /**
   * 获取第三方机构列表
   */
  getFollowUpPlans(type) {
    return this._apiService.get(`${PATH.followList}?type=${type}`);
  }

  /**
   * 新建鲜花等级
   */
  followUpPlanCreate(data) {
    return this._apiService.post(`${PATH.followCreate}`, data);
  }

  /**
   * 编辑鲜花等级
   */
  followUpPlanEdit(data) {
    return this._apiService.post(`${PATH.followEdit}`, data);
  }

  /**
   * 删除鲜花等级
   */
  followUpPlanDelete(id: number) {
    return this._apiService.postParma(`${PATH.followDelete}?id=${id}`);
  }

}
