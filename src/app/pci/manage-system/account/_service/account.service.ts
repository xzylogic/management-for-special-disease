import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  account: 'opt/auth/getAdmin', // 账号获取
};
@Injectable()
export class AccountService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  accountConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '账号管理',
      subTitle: '账号管理列表',
      ifHome: true,
      homeRouter: '/account',
      currentRouter: '/account'
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
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.account}?page=${page}&size=${size}&name=${keyword}`);
    // return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.account}?page=${page}&size=${size}&&keyword=${keyword}&&deleted=${deleted}&&remind=${remind}`);
  }
}
