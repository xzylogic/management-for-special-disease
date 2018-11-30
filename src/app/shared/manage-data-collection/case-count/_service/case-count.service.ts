import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  caseCount: 'record/user/statistics', // 患者用药提醒管理
};
@Injectable()
export class CaseCountService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  caseCountConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '病例统计',
      subTitle: '病例统计列表',
      ifHome: true,
      homeRouter: '/case-count',
      currentRouter: '/case-count'
    });
  }

  /**
   * 获取患者用药提醒列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   * @param {string} standard   [状态，0正常，1异常]
   * @param {string} standard   [闹钟，0正常，1异常]
   */
  getData(page: number, size: number, keyword: string) {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.caseCount}?flag=${page}&size=${size}&&param=${keyword}`);
    // return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.caseCount}?page=${page}&size=${size}&&keyword=${keyword}&&deleted=${deleted}&&remind=${remind}`);
  }
}
