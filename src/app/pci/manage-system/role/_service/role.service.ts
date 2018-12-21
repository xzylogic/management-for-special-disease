import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  role: 'opt/auth/getRole', // 获取角色
  enableRole: 'opt/auth/enableRole', // 禁用、启用
  addRole: 'opt/auth/addRole', // 添加系统角色
};
@Injectable()
export class RoleService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  roleConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: '角色管理列表',
      ifHome: true,
      homeRouter: '/role',
      currentRouter: '/role'
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
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.role}?page=${page}&size=${size}&&name=${keyword}`);
  }

  enableRole(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.enableRole}?roleId=${id}`);
  }

  addRole() {
    console.log('添加系统角色');
  }
}
