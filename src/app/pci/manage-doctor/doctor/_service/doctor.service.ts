import { Inject, Injectable } from '@angular/core';

import { HttpService } from '../../../../libs/_service/http.service';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  doctorQuery: 'api/doctor/query', // 查询选项列表
  sendMessage: 'doctor/sendMsg', // 编辑短信提醒医生
};

@Injectable()
export class DoctorService {
  constructor(
    @Inject('app') private app,
    private httpService: HttpService,
  ) {
  }

  doctorConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生信息列表',
      ifHome: true,
      homeRouter: '/doctor',
      currentRouter: '/doctor'
    });
  }

  doctorEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: tag ? '新增医生' : '编辑医生信息',
      ifHome: false,
      homeRouter: '/doctor',
      currentRouter: '/doctor/edit'
    });
  }

  getDoctors(key: string, page: number, size: number, index: number) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.doctorQuery}?page=${page}&size=${size}&param=${key}&index=${index}`
    );
  }

  getAuditedDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 1);
  }

  getAuditingDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 2);
  }

  getFailureDoctors(key: string, page: number, size: number) {
    return this.getDoctors(key, page, size, 3);
  }
}
