import { Injectable, Inject } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  userPeriodStatistics: 'api/statistics/login/log/user', // 患者时间段内活跃度统计
  doctorPeriodStatistics: 'api/statistics/login/log/doctor', // 医生时间段内活跃度统计
};

@Injectable()
export class PeriodStatisticsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  activenessConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '活跃度统计',
      ifHome: true,
      homeRouter: '/period-statistics',
      currentRouter: '/period-statistics'
    });
  }

  // constructor(private _apiService: ApiService) {
  // }
  //
  getUserResult(option: { startTime: string, endTime: string }) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userPeriodStatistics}?startTime=${option.startTime}&endTime=${option.endTime}`);
  }

  getDoctorResult(option: { startTime: string, endTime: string }) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorPeriodStatistics}?startTime=${option.startTime}&endTime=${option.endTime}`);
  }
}
