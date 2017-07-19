import { Inject, Injectable } from '@angular/core';

import { ContainerConfig } from '../../../../libs';

const PATH = {
  assessmentRisk: 'api/framingham', // 风险评估
};

@Injectable()
export class AssessmentRiskService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  assessmentRiskConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生信息列表',
      ifHome: true,
      homeRouter: '/assessment-risk',
      currentRouter: '/assessment-risk'
    });
  }

  /**
   * 获取默认风险评估列表
   */
  getAssessmentServices(keyword: string, level: number | string, size: number, page: number) {
    return this.httpService.get(`${PATH.assessmentRisk}?keyword=${keyword}&level=${level}&size=${size}&page=${page}`);
  }
}
