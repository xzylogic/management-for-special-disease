import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  userList: 'api/user/list', // 查询患者列表
  userOptionList: 'api/user/option', // 获取医院选项列表
  userCreate: 'api/user/add', // 新增患者
  userUpdate: 'api/user/update', // 编辑患者信息
  IntegralDetail: 'opt/integral/records/list/', // 个人积分明细
};

@Injectable()
export class UserService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  userConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: '患者信息列表',
      ifHome: true,
      homeRouter: '/user',
      currentRouter: '/user'
    });
  }

  userEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: tag ? '新增患者' : '编辑患者信息',
      ifHome: false,
      homeRouter: '/user',
      currentRouter: '/user/edit'
    });
  }

  userIntegralConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: '患者积分详情列表',
      ifHome: false,
      homeRouter: '/user',
      currentRouter: '/user/integral'
    });
  }

  //  * 获取患者列表
  //  * @param {string} key     [description]
  //  * @param {boolean} bind   [description]
  //  * @param {number} page    [description]
  //  * @param {number} size    [description]
  //  */
  getUsers(key: string, bind: boolean, page: number, size: number) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.userList}?keyword=${key}&binding=${bind}&page=${page}&size=${size}`
    );
  }

  /**
   * 获取医院选项列表
   */
  getOptions() {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.userOptionList}`
    )
  }

  /**
   * 新建患者
   * @param {[type]} body [description]
   */
  userCreate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.userCreate}`, body)
  }

  /**
   * 更新患者信息
   * @param {[type]} body [description]
   */
  userUpdate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.userUpdate}`, body);
  }

  /**
   * 个人积分明细表
   */
  userIntegralDetail(traderId: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.IntegralDetail}${traderId}/0?flag=${page}`);
  }
}
