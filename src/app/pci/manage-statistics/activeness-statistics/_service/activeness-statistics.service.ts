import { Inject, Injectable } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  userActivenessStatistics: 'api/statistics/activity/user', // 患者日活跃度统计
  doctorActivenessStatistics: 'api/statistics/activity/doctor', // 医生日活跃度统计
};

@Injectable()
export class ActivenessStatisticsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  activenessConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '日活跃度统计',
      ifHome: true,
      homeRouter: '/activeness-statistics',
      currentRouter: '/activeness-statistics'
    });
  }

  getUserActiveness(obj: { page: number, size: number, key ?: string, date ?: string }) {
    if (obj.date && !obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else if (!obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?key=${obj.key}&page=${obj.page}&size=${obj.size}`
      );
    } else if (obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?key=${obj.key}&date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}?page=${obj.page}&size=${obj.size}`
      );
    }
  }

  getDoctorActiveness(obj: { page: number, size: number, key ?: string, date ?: string }) {
    if (obj.date && !obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else if (!obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?key=${obj.key}&page=${obj.page}&size=${obj.size}`
      );
    } else if (obj.date && obj.key) {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?key=${obj.key}&date=${obj.date}&page=${obj.page}&size=${obj.size}`
      );
    } else {
      return this.httpService.get(
        `${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}?page=${obj.page}&size=${obj.size}`
      );
    }
  }
}
