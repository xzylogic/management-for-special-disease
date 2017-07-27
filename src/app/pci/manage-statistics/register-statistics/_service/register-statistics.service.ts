import { Injectable, Inject } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  doctorRegister: 'api/statistics/register/doctor', // 医生注册量统计
  doctorTotal: 'api/statistics/register/doctor/total', // 注册总数 审核总数
  userRegister: 'api/statistics/register/user', // 患者注册量统计
  userTotal: 'api/statistics/register/user/total', // 患者注册总数
}
@Injectable()
export class RegisterStatisticsService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  registerStatisticsConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '注册量统计',
      ifHome: true,
      homeRouter: '/register-statistics',
      currentRouter: '/register-statistics'
    });
  }

  /**
   * 获取患者注册量统计
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getUsers(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userRegister}?page=${page}&size=${size}`);
  }

  /**
   * 获取医生注册量统计
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDoctors(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorRegister}?page=${page}&size=${size}`);
  }

  /**
   * 获取医生注册总数 审核总数
   */
  getDoctorTotals() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorTotal}`);
  }

  /**
   * 获取患者注册总数
   */
  getUserTotals() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userTotal}`);
  }
}
