import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import {FormBase} from "../../../../libs/dform/_entity/form-base";
import {FormText} from "../../../../libs/dform/_entity/form-text";
import {FormTree} from "../../../../libs/dform/_entity/form-tree";

const PATH = {
  role: 'opt/auth/getRole', // 获取角色
  enableRole: 'opt/auth/enableRole', // 禁用、启用
  addRole: 'opt/auth/addRole', // 添加系统角色
  getMenu: 'opt/auth/getMenu', // 获取菜单
  getRoleMenu: 'opt/auth/getRoleMenu', // 获取该角色菜单
  addRoleMenu: 'opt/auth/addRoleMenu', // 配置该角色菜单
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

  setRoleEditConfig(flag) {
    return new ContainerConfig({
      title: '系统管理',
      subTitle: flag ? '编辑角色' : '新增角色',
      ifHome: false,
      homeRouter: '/role',
      currentRouter: '/role/edit',
    });
  }

  setRoleForm(tree, data?, id?) {
    let name, des, ReData;
    if(data){
      ReData = data.reverse();
    }
    if(id){
      name = ReData[id-1].name;
      des = ReData[id-1].description;
    }

    const forms: FormBase<any>[] = [];
    forms.push(
      new FormText({
        key: 'name',
        label: '角色名称',
        value: name || '',
        required: true,
        errMsg: '请填写角色名称'
      })
    );
    forms.push(
      new FormText({
        key: 'description',
        label: '描述',
        value: des || '',
        required: true,
        errMsg: '请填写描述'
      })
    );
    return forms;
  }

  setRoleTreeForm(tree) {
    const forms: FormBase<any>[] = [];
    forms.push(
      new FormTree({
        key: 'menuIds',
        label: '菜单权限',
        value: [],
        required: true,
        options: tree || [],
        errMsg: '请选择菜单权限'
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
  getData(page: number, size: number, keyword: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.role}?page=${page}&size=${size}&&name=${keyword}`);
  }
  getRole(id: any) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.role}?sysRoleId=${id}`);
  }

  enableRole(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.enableRole}?roleId=${id}`);
  }

  getMenus() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getMenu}`);
  }

  getRoleMenu(id) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getRoleMenu}?sysRoleId=${id}`);
  }

  addRoleMenu(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.addRoleMenu}`, data);
  }

  updateRole(data, id?: any) {
    // console.log('添加、更新系统角色', data, id);
    let params = '';
    if(id){
      params = `sysRoleId=${id}`;
    }
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.addRole}?${params}`, data);
  }
}
