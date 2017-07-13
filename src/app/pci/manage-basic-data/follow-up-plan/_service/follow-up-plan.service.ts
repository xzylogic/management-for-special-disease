import { Inject, Injectable } from '@angular/core';

const PATH = {
  followList: 'api/flupTemplate/list', // 随访计划模板列表
  followCreate: 'api/flupTemplate/save', // 新增随访计划
  followEdit: 'api/flupTemplate/update', // 编辑随访计划
  followDelete: 'api/flupTemplate/delete', // 删除随访计划
};

@Injectable()
export class FollowUpPlanService {

  constructor(
    @Inject('api') private api,
    @Inject('http') private httpService
  ) {
  }

  /**
   * 获取第三方机构列表
   */
  getFollowUpPlans(type) {
    return this.httpService.get(`${this.api.pci.BASE_URL}${PATH.followList}?type=${type}`);
  }

  /**
   * 新建鲜花等级
   */
  followUpPlanCreate(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.followCreate}`, data);
  }

  /**
   * 编辑鲜花等级
   */
  followUpPlanEdit(data) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.followEdit}`, data);
  }

  /**
   * 删除鲜花等级
   */
  followUpPlanDelete(id: number) {
    return this.httpService.post(`${this.api.pci.BASE_URL}${PATH.followDelete}?id=${id}`, {});
  }

}
