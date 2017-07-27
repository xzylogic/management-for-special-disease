import { Injectable, Inject } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  businessData: 'opt/datas/pointData', // 业务数据统计
};

@Injectable()
export class BusinessStatisticsService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  businessConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '业务数据统计',
      ifHome: true,
      homeRouter: '/business-statistics',
      currentRouter: '/business-statistics'
    });
  }

  getData(option: { startTime: string, endTime: string }) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.businessData}?start=${option.startTime}&end=${option.endTime}`);
}
}
