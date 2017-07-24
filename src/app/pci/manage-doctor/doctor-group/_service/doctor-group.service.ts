import { Inject, Injectable } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  doctorGroupList: 'opt/doctorGroups/queryAllDoctorGroup', // 查询所有医生小组
  auditingServiceList: 'opt/doctorPackages/list', // 查询待审核服务列表
  doctorGroupOrderDetail: 'opt/healthOrders/listOrderDetail', // 查询服务明细列表
  doctorGroupUpdateDesc: 'opt/doctorGroups/saveDoctorGroupDesc', // 保存医生小组介绍
  doctorGroupCountAuditing: 'opt/doctorPackages/countNoPassDoctorPackages', // 计算没有审核的服务数量
  auditingServiceSuccess: '/opt/doctorPackages/audit', // 审核服务
};

@Injectable()
export class DoctorGroupService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  doctorGroupConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生小组管理',
      subTitle: '医生小组列表',
      ifHome: true,
      homeRouter: '/doctor-group',
      currentRouter: '/doctor-group'
    });
  }

  doctorGroupEditConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生小组管理',
      subTitle: '编辑医生小组',
      ifHome: false,
      homeRouter: '/doctor-group',
      currentRouter: '/doctor-group/edit'
    });
  }

  serviceDetailConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生小组管理',
      subTitle: '医生小组服务明细',
      ifHome: false,
      homeRouter: '/doctor-group',
      currentRouter: '/doctor-group/service'
    });
  }

  /**
   * [getDoctorGroups description]
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getDoctorGroups(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorGroupList}?page=${page}&size=${size}`);
  }

  /**
   * [getAuditingServices description]
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getAuditingServices(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.auditingServiceList}?page=${page}&size=${size}`);
  }

  /**
   * [getServiceDetails description]
   * @param {number} id   [description]
   * @param {number} page [description]
   * @param {number} size [description]
   */
  getServiceDetails(id: number, page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorGroupOrderDetail}?dgid=${id}&page=${page}&size=${size}`);
  }

  /**
   * [doctorGroupUpdateDesc description]
   * @param {number} id   [description]
   * @param {string} desc [description]
   */
  doctorGroupUpdateDesc(id: number, desc: string) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.doctorGroupUpdateDesc}?dgid=${id}&desc=${desc}`, {})
  }

  /**
   * [getAuditingServiceCount description]
   */
  getAuditingServiceCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorGroupCountAuditing}`)
  }

  /**
   * [serviceAuditingSuccess description]
   * @param {number} id [description]
   */
  serviceAuditingSuccess(id: number) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.auditingServiceSuccess}?pid=${id}&index=1`, {});
  }
}
