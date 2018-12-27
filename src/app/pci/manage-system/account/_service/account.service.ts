import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import {FormBase} from "../../../../libs/dform/_entity/form-base";
import {FormText} from "../../../../libs/dform/_entity/form-text";
import {FormTree} from "../../../../libs/dform/_entity/form-tree";
import {FormRadio} from "../../../../libs/dform/_entity/form-radio";

const PATH = {
  account: 'opt/auth/getAdmin', // 账号获取
  enable: 'opt/auth/enable',    // 启用、禁用
  getAllRole: 'opt/auth/getAllRole',    // 获取所有角色
  addAdminRole: 'opt/auth/addAdminRole',    // 配置系统用户角色
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

  setAccountConfig(flag) {
    return new ContainerConfig({
      title: '账号管理',
      subTitle: flag ? '配置角色' : '配置角色',
      ifHome: false,
      homeRouter: '/account',
      currentRouter: '/account/config',
    });
  }

  setAccountForm(data, id?) {
    console.log(data)

    let name = data.name;
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormRadio({
        key: 'roleId',
        label: '角色名称',
        value: name || '',
        required: true,
        options: data || [],
        errMsg: '请选择角色'
      })
    );
    return forms;
  }
  /**
   * 获取患者用药提醒列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   * @param {string} standard   [状态，0正常，1异常]
   * @param {string} standard   [闹钟，0正常，1异常]
   */
  getData(page: number, size: number, keyword?: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.account}?page=${page}&size=${size}&name=${keyword}`);
  }

  enableAccount(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.enable}?adminId=${id}`);
  }

  getAllRole() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getAllRole}`);
  }

  addAdminRole(data, id?: any) {
    // console.log('添加、更新系统角色', data, id);
    let params = '';
    if(id){
      params = `sysRoleId=${id}`;
    }
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.addAdminRole}`, data);
  }
}
